import threeEngine from './Components/Three';
import cannonEngine from './Components/Cannon';
import EngineManager from './Components/EngineManager';
import PositionHelper from './Components/PositionHelper';
import BlockSizeManager from './Components/Block/BlockSizeManager';
import EventEmitter from './Utils/EventEmitter';
import BlockGenerator from './Components/Block/BlockGenerator';
import Game from './Components/Game';
import { CREATE_BLOCK, ANIMATE_ACTIVE_BLOCK, SYNC_BLOCK_WITH_ENGINE, CHANGE_AXIS, PRERENDER, UPDATE_BLOCK_POSITION, SYNC_POSITION, START_GAME, FIND_INTERSECTION, UPDATE_BLOCK_SIZE, DELETE_BLOCK } from './Consts/actions';
import { threeEngineAdapter } from './Components/Three';
import { cannonEngineAdapter } from './Components/Cannon';
import BoxHelper from './Utils/BoxHelper';
import { MinMaxValues } from './Types/common';
import Block from './Components/Block/Block';
import { IntersectionHelper } from './Utils/IntersectionHelper';
import AxisSizeMapper from './Utils/AxisSizeMapper';
import { DEFAULT_AXIS_OFFSET } from './Consts/Common';

const eventEmitter = new EventEmitter();

// ToDo maybe pass threeEngineAdapter and cannonEngineAdapter??
const engineManager = new EngineManager(threeEngine, cannonEngine);

const positionHelper = new PositionHelper();
const blockSizeManager = new BlockSizeManager();

const blockGenerator = new BlockGenerator(positionHelper, blockSizeManager);

const game = new Game(engineManager, eventEmitter);

eventEmitter.addListener(START_GAME, game.setIsGameStarted)
eventEmitter.addListener(START_GAME, game.runAnimateLoop);
eventEmitter.addListener(CREATE_BLOCK, blockGenerator.generateNewBlock);
eventEmitter.addListener(PRERENDER, engineManager.animate);
eventEmitter.addListener(SYNC_BLOCK_WITH_ENGINE, threeEngineAdapter.addGameBlock);
eventEmitter.addListener(SYNC_BLOCK_WITH_ENGINE, cannonEngineAdapter.addGameBlock);
eventEmitter.addListener(CHANGE_AXIS, game.toggleAxes);
eventEmitter.addListener(ANIMATE_ACTIVE_BLOCK, blockGenerator.changePositionInLastBlock);
eventEmitter.addListener(UPDATE_BLOCK_POSITION, positionHelper.setPosition);
eventEmitter.addListener(UPDATE_BLOCK_SIZE, blockSizeManager.setSizes)
eventEmitter.addListener(SYNC_POSITION, blockGenerator.syncBlockPosition)
eventEmitter.addListener(DELETE_BLOCK, threeEngineAdapter.removeGameBlock);
eventEmitter.addListener(DELETE_BLOCK, cannonEngineAdapter.removeGameBlock);
eventEmitter.addListener(DELETE_BLOCK, blockGenerator.removeBlock);

/**
 * Use for pipeline
 */
eventEmitter.addListener(FIND_INTERSECTION, BoxHelper.wrapMeshToBox);
eventEmitter.addListener(FIND_INTERSECTION, BoxHelper.getAxisLine);

// eventEmitter.addListener(STABLE_ACTIVE_BLOCK, blockGenerator.makeStable)


window.addEventListener('DOMContentLoaded', () => {
    eventEmitter.emit(CREATE_BLOCK);

    const gameBlock = blockGenerator.getLastBlock();

    eventEmitter.emit(SYNC_BLOCK_WITH_ENGINE, gameBlock);
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


        // ToDo Simplify
        // Find axis line stable block and active block
        const { [axis]: line1 } = eventEmitter.pipeline<Block, MinMaxValues>(FIND_INTERSECTION, stableBlock.getBlock());
        const { [axis]: line2 } = eventEmitter.pipeline<Block, MinMaxValues>(FIND_INTERSECTION, activeBlock.getBlock());

        /**
         * Generate Slice Block
         */

        const lineDifference = IntersectionHelper.getLineDifference(line1, line2);


        /**
         * Generate Stable Block
         */


        //ToDo redo
        const { size, start } = IntersectionHelper.getLineIntersection(line1, line2);

        const [x, y, z] = positionHelper.getPosition()
        const position = { y, x, z, [axis]: start };

        const sizeUnit = AxisSizeMapper.axisToSize(axis);
        const blockSize = { ...blockSizeManager.getSizes(), [sizeUnit]: size };
        eventEmitter.emit(UPDATE_BLOCK_POSITION, position);
        eventEmitter.emit(UPDATE_BLOCK_SIZE, blockSize);
        eventEmitter.emit(CREATE_BLOCK);


        const gameBlock = blockGenerator.getLastBlock();

        eventEmitter.emit(SYNC_BLOCK_WITH_ENGINE, gameBlock);
    }
})

window.addEventListener('click', () => {
    eventEmitter.emit(CHANGE_AXIS);
})

window.addEventListener('click', () => {
    const axis = game.getAxis();
    const [x, y, z] = positionHelper.getPosition()
    const position = { x, y: y + 1, z, [axis]: DEFAULT_AXIS_OFFSET }

    eventEmitter.emit(UPDATE_BLOCK_POSITION, position);
    eventEmitter.emit(CREATE_BLOCK);

    const gameBlock = blockGenerator.getLastBlock();

    eventEmitter.emit(SYNC_BLOCK_WITH_ENGINE, gameBlock);
})



window.addEventListener('click', () => {
    const isGameStarted = game.getIsGameStarted();

    // first click
    if (!isGameStarted) {
        eventEmitter.emit(START_GAME, true);
    }
})