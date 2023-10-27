import threeEngine from './Components/Three';
import cannonEngine from './Components/Cannon';
import EngineManager from './Components/EngineManager';
import PositionHelper from './Components/PositionHelper';
import BlockSizeManager from './Components/Block/BlockSizeManager';
import EventEmitter from './Utils/EventEmitter';
import BlockGenerator from './Components/Block/BlockGenerator';
import Game from './Components/Game';
import { CREATE_BLOCK, ANIMATE_ACTIVE_BLOCK, SYNC_BLOCK_WITH_ENGINE, CHANGE_AXIS, PRERENDER, UPDATE_BLOCK_POSITION, SYNC_POSITION, START_GAME, STABLE_ACTIVE_BLOCK } from './Consts/actions';
import { threeEngineAdapter } from './Components/Three';
import { cannonEngineAdapter } from './Components/Cannon';

const eventEmitter = new EventEmitter();

const engineManager = new EngineManager(threeEngine, cannonEngine);

const positionHelper = new PositionHelper();
const blockSizeManager = new BlockSizeManager();

const blockGenerator = new BlockGenerator(positionHelper, blockSizeManager);

const game = new Game(engineManager, eventEmitter);

eventEmitter.addListener(START_GAME, game.setIsGameStarted)
eventEmitter.addListener(START_GAME, game.runAnimateLoop);
eventEmitter.addListener(CREATE_BLOCK, blockGenerator.generateNewBlock);
eventEmitter.addListener(PRERENDER, engineManager.animate);
eventEmitter.addListener(SYNC_BLOCK_WITH_ENGINE, threeEngineAdapter.addGameBlockToEngine);
eventEmitter.addListener(SYNC_BLOCK_WITH_ENGINE, cannonEngineAdapter.addGameBlockToEngine);
eventEmitter.addListener(CHANGE_AXIS, game.toggleAxes);
eventEmitter.addListener(ANIMATE_ACTIVE_BLOCK, blockGenerator.changePositionInLastBlock);
eventEmitter.addListener(UPDATE_BLOCK_POSITION, positionHelper.setPosition);
eventEmitter.addListener(SYNC_POSITION, blockGenerator.syncBlockPosition)
// eventEmitter.addListener(STABLE_ACTIVE_BLOCK, blockGenerator.makeStable)


window.addEventListener('DOMContentLoaded', () => {
    eventEmitter.emit(CREATE_BLOCK);

    const gameBlock = blockGenerator.getLastBlock();

    eventEmitter.emit(SYNC_BLOCK_WITH_ENGINE, gameBlock);
    eventEmitter.emit(PRERENDER);
})

window.addEventListener('click', () => {
    eventEmitter.emit(CHANGE_AXIS);
})

window.addEventListener('click', () => {
    const y = positionHelper.getY() + 1;
    const axis = game.getAxis();

    const position = { y, x: 1.5, z: 1.5, [axis]: -15 }
    eventEmitter.emit(UPDATE_BLOCK_POSITION, position);
    // console.log(positionHelper.getPosition());
    eventEmitter.emit(CREATE_BLOCK);

    const gameBlock = blockGenerator.getLastBlock();

    eventEmitter.emit(SYNC_BLOCK_WITH_ENGINE, gameBlock);
})

window.addEventListener('click', () => {

})


window.addEventListener('click', () => {
    const isGameStarted = game.getIsGameStarted();

    if (!isGameStarted) eventEmitter.emit(START_GAME, true);
})