import threeEngine, { camera } from './Components/Three';
import cannonEngine from './Components/Cannon';
import EngineManager from './Components/EngineManager';
import PositionHelper from './Components/PositionHelper';
import BlockSizeManager from './Components/Block/BlockSizeManager';
import EventEmitter from './Utils/EventEmitter';
import BlockGenerator from './Components/Block/Spaghetti';
import Game from './Components/Game';
import { CREATE_BLOCK, ANIMATE_ACTIVE_BLOCK, SYNC_BLOCK_WITH_ENGINE, CHANGE_AXIS, PRERENDER, CHANGE_POSITION, SYNC_POSITION, START_GAME, CHANGE_BLOCK_SIZE, DELETE_BLOCK, CHANGE_CAMERA_POSITION, GET_AXIS_LINE, CREATE_BLOCK_PART, ADD_BLOCK_IN_STACK } from './Const/actions';
import { threeEngineAdapter } from './Components/Three';
import { cannonEngineAdapter } from './Components/Cannon';
import BoxHelper from './Utils/BoxHelper';
import { BLOCK_POSITION, BLOCK_SIZE } from './Const/Common';
import Stats from './Components/Stats';
import './style.css';
import StableBlockCommand from './Components/BlockGenerator/StableBlockCommand';
import OffsetBlockCommand from './Components/BlockGenerator/OffsetBlockCommand';
import SliceBlockCommand from './Components/BlockGenerator/SliceBlockCommand';
import BlockStack from './Components/Block/BlockStack';

/**
 * Setup instances
 */
const eventEmitter = new EventEmitter();
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
const blockGenerator = new BlockGenerator(positionHelper, blockSizeManager, eventEmitter);
const blocksStack = new BlockStack();
const game = new Game(engineManager, eventEmitter, stats);

// ToDo: PASS FUNCTION TO METHOD FOR CALCULATE POSITION AND SIZE
// ToDo: MAYBE ADD TWO POSITION HELPER FIRST - FOR BLOCK, SECOND FOR SLICE BLOCK
const stableBlockCommand = new StableBlockCommand(positionHelper, blockSizeManager);
const offsetBlockCommand = new OffsetBlockCommand(positionHelper, blockSizeManager)
const sliceBlockCommand = new SliceBlockCommand(positionHelper, blockSizeManager);


/**
 * Callbacks on events
 */
eventEmitter.addListener(START_GAME, game.setIsGameStarted)
eventEmitter.addListener(START_GAME, game.runAnimateLoop);
eventEmitter.addListener(CREATE_BLOCK, blockGenerator.generateBlock);
eventEmitter.addListener(CREATE_BLOCK_PART, blockGenerator.generateBlockPart)
eventEmitter.addListener(PRERENDER, engineManager.animate);
eventEmitter.addListener(SYNC_BLOCK_WITH_ENGINE, threeEngineAdapter.addGameBlock);
eventEmitter.addListener(SYNC_BLOCK_WITH_ENGINE, cannonEngineAdapter.addGameBlock);
eventEmitter.addListener(CHANGE_AXIS, game.toggleAxes);
eventEmitter.addListener(ANIMATE_ACTIVE_BLOCK, blocksStack.changePositionInLastBlock);
eventEmitter.addListener(CHANGE_POSITION, positionHelper.setPosition);
eventEmitter.addListener(CHANGE_BLOCK_SIZE, blockSizeManager.setSizes)
eventEmitter.addListener(SYNC_POSITION, blocksStack.syncBlockPosition)
eventEmitter.addListener(DELETE_BLOCK, threeEngineAdapter.removeGameBlock);
eventEmitter.addListener(DELETE_BLOCK, cannonEngineAdapter.removeGameBlock);
eventEmitter.addListener(DELETE_BLOCK, blocksStack.removeBlock);
eventEmitter.addListener(CHANGE_CAMERA_POSITION, camera.updateCameraPosition)
eventEmitter.addListener(GET_AXIS_LINE, BoxHelper.getAxisLineCannon);
eventEmitter.addListener(ADD_BLOCK_IN_STACK, blocksStack.addBlock)

window.addEventListener('DOMContentLoaded', () => {
  eventEmitter.emit(CREATE_BLOCK);

  eventEmitter.emit(PRERENDER);
})

window.addEventListener('click', () => {
  const isGameStarted = game.getIsGameStarted();
  const axis = game.getAxis();

  if (isGameStarted) {
    const [stableBlock, activeBlock] = blocksStack.getLastBlocks(2);

    eventEmitter.emit(DELETE_BLOCK, activeBlock);

    const slice = sliceBlockCommand.execute(axis, stableBlock.getUiBlock(), activeBlock.getUiBlock());
    eventEmitter.emit(CHANGE_POSITION, slice.position);
    eventEmitter.emit(CHANGE_BLOCK_SIZE, slice.size);
    eventEmitter.emit(CREATE_BLOCK_PART);

    const stable = stableBlockCommand.execute(axis, stableBlock.getUiBlock(), activeBlock.getUiBlock());
    eventEmitter.emit(CHANGE_POSITION, stable.position);
    eventEmitter.emit(CHANGE_BLOCK_SIZE, stable.size);
    eventEmitter.emit(CREATE_BLOCK);
  }
})

window.addEventListener('click', () => {
  eventEmitter.emit(CHANGE_AXIS);
})

window.addEventListener('click', () => {
  const axis = game.getAxis();

  const offset = offsetBlockCommand.execute(axis);
  eventEmitter.emit(CHANGE_POSITION, offset.position);
  eventEmitter.emit(CHANGE_BLOCK_SIZE, offset.size);
  eventEmitter.emit(CREATE_BLOCK);
})

window.addEventListener('click', () => {
  eventEmitter.emit(CHANGE_CAMERA_POSITION);
})

window.addEventListener('click', () => {
  const isGameStarted = game.getIsGameStarted();

  // first click
  if (!isGameStarted) {
    eventEmitter.emit(START_GAME, true);
  }
})
