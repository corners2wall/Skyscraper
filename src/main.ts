import threeEngine, { camera } from './Components/Three';
import cannonEngine from './Components/Cannon';
import EngineManager from './Components/EngineManager';
import PositionHelper from './Components/PositionHelper';
import BlockSizeManager from './Components/Block/BlockSizeManager';
import EventEmitter from './Utils/EventEmitter';
import BlockGenerator from './Components/Block/BlockGenerator';
import Game from './Components/Game';
import { CREATE_BLOCK, ANIMATE_ACTIVE_BLOCK, SYNC_BLOCK_WITH_ENGINE, CHANGE_AXIS, PRERENDER, CHANGE_POSITION, SYNC_POSITION, START_GAME, FIND_INTERSECTION, UPDATE_BLOCK_SIZE, DELETE_BLOCK, UPDATE_CAMERA_POSITION } from './Const/actions';
import { threeEngineAdapter } from './Components/Three';
import { cannonEngineAdapter } from './Components/Cannon';
import BoxHelper from './Utils/BoxHelper';
import { MinMaxValues } from './Types/common';
import Block from './Components/Block/UiBlock';
import { IntersectionHelper } from './Utils/IntersectionHelper';
import AxisSizeMapper from './Utils/AxisSizeMapper';
import { BLOCK_MASS, DEFAULT_AXIS_OFFSET, BLOCK_POSITION, BLOCK_SIZE } from './Const/Common';
import Stats from './Components/Stats';
import './style.css';

const eventEmitter = new EventEmitter();

// ToDo maybe pass threeEngineAdapter and cannonEngineAdapter??
const engineManager = new EngineManager(threeEngine, cannonEngine);
const stats = new Stats();
const positionHelper = new PositionHelper(
    BLOCK_POSITION.x,
    BLOCK_POSITION.y,
    BLOCK_POSITION.z,
);
const blockSizeManager = new BlockSizeManager(
    BLOCK_SIZE.width,
    BLOCK_SIZE.height,
    BLOCK_SIZE.depth,
);

const blockGenerator = new BlockGenerator(positionHelper, blockSizeManager);

const game = new Game(engineManager, eventEmitter, stats);

eventEmitter.addListener(START_GAME, game.setIsGameStarted)
eventEmitter.addListener(START_GAME, game.runAnimateLoop);
eventEmitter.addListener(CREATE_BLOCK, blockGenerator.generateNewBlock);
eventEmitter.addListener(PRERENDER, engineManager.animate);
eventEmitter.addListener(SYNC_BLOCK_WITH_ENGINE, threeEngineAdapter.addGameBlock);
eventEmitter.addListener(SYNC_BLOCK_WITH_ENGINE, cannonEngineAdapter.addGameBlock);
eventEmitter.addListener(CHANGE_AXIS, game.toggleAxes);
eventEmitter.addListener(ANIMATE_ACTIVE_BLOCK, blockGenerator.changePositionInLastBlock);
eventEmitter.addListener(CHANGE_POSITION, positionHelper.setPosition);
eventEmitter.addListener(UPDATE_BLOCK_SIZE, blockSizeManager.setSizes)
eventEmitter.addListener(SYNC_POSITION, blockGenerator.syncBlockPosition)
eventEmitter.addListener(DELETE_BLOCK, threeEngineAdapter.removeGameBlock);
eventEmitter.addListener(DELETE_BLOCK, cannonEngineAdapter.removeGameBlock);
eventEmitter.addListener(DELETE_BLOCK, blockGenerator.removeBlock);
eventEmitter.addListener(UPDATE_CAMERA_POSITION, camera.updateCameraPosition)

/**
 * Use for pipeline
 */
eventEmitter.addListener(FIND_INTERSECTION, BoxHelper.wrapMeshToBox);
eventEmitter.addListener(FIND_INTERSECTION, BoxHelper.getAxisLine);

// ToDo: simplify
window.addEventListener('DOMContentLoaded', () => {
    eventEmitter.emit(CREATE_BLOCK);

    const block = blockGenerator.getLastBlock();

    eventEmitter.emit(SYNC_BLOCK_WITH_ENGINE, block);
    eventEmitter.emit(PRERENDER);
})

window.addEventListener('click', () => {
    const isGameStarted = game.getIsGameStarted();
    const axis = game.getAxis();

    if (isGameStarted) {
        const [stableBlock, activeBlock] = blockGenerator.getTwoLastBlock();

        /**
         * Delete Animate block
         */
        eventEmitter.emit(DELETE_BLOCK, activeBlock);

        // ToDo Make OBSERVER!!!!!!!!!
        // ToDo Simplify
        // Find axis line stable block and active block
        const { [axis]: line1 } = eventEmitter.pipeline<Block, MinMaxValues>(FIND_INTERSECTION, stableBlock.getUiBlock());
        const { [axis]: line2 } = eventEmitter.pipeline<Block, MinMaxValues>(FIND_INTERSECTION, activeBlock.getUiBlock());
        const {x, y, z} = positionHelper.getPosition();
        const sizeUnit = AxisSizeMapper.axisToSize(axis);

        /**
         * Generate Slice Block
         */

        const { size: si, start: st } = IntersectionHelper.getLineDifference(line1, line2);

        const pos = { y, x, z, [axis]: st };

        const bs = { ...blockSizeManager.getSizes(), [sizeUnit]: si };
        eventEmitter.emit(CHANGE_POSITION, pos);
        eventEmitter.emit(UPDATE_BLOCK_SIZE, bs);
        eventEmitter.emit(CREATE_BLOCK, BLOCK_MASS);

        const gb = blockGenerator.getLastBlock();

        eventEmitter.emit(SYNC_BLOCK_WITH_ENGINE, gb);


        /**
         * Generate Stable Block
         */


        //ToDo redo
        const { size, start } = IntersectionHelper.getLineIntersection(line1, line2);

        const position = { y, x, z, [axis]: start };

        const blockSize = { ...blockSizeManager.getSizes(), [sizeUnit]: size };
        eventEmitter.emit(CHANGE_POSITION, position);
        eventEmitter.emit(UPDATE_BLOCK_SIZE, blockSize);
        eventEmitter.emit(CREATE_BLOCK);

        const block = blockGenerator.getLastBlock();

        eventEmitter.emit(SYNC_BLOCK_WITH_ENGINE, block);
    }
})

window.addEventListener('click', () => {
    eventEmitter.emit(CHANGE_AXIS);
})

window.addEventListener('click', () => {
    const axis = game.getAxis();
    const {x, y, z} = positionHelper.getPosition()
    const position = { x, y: y + 1, z, [axis]: DEFAULT_AXIS_OFFSET }

    eventEmitter.emit(CHANGE_POSITION, position);
    eventEmitter.emit(CREATE_BLOCK);

    const block = blockGenerator.getLastBlock();

    eventEmitter.emit(SYNC_BLOCK_WITH_ENGINE, block);
})

window.addEventListener('click', () => {
    eventEmitter.emit(UPDATE_CAMERA_POSITION);
})


window.addEventListener('click', () => {
    const isGameStarted = game.getIsGameStarted();

    // first click
    if (!isGameStarted) {
        eventEmitter.emit(START_GAME, true);
    }
})