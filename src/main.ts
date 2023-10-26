import threeEngine from './Components/Three';
import cannonEngine from './Components/Cannon';
import EngineManager from './Components/EngineManager';
import PositionHelper from './Components/PositionHelper';
import BlockSizeManager from './Components/Block/BlockSizeManager';
import EventEmitter from './Utils/EventEmitter';
import BlockGenerator from './Components/Block/BlockGenerator';
import Game from './Components/Game';
import { RUN_GAME, CREATE_BLOCK, ANIMATE_BLOCK, SYNC_BLOCK_WITH_ENGINE, TOGGLE_AXIS } from './Consts/actions';

const eventEmitter = new EventEmitter();

const engineManager = new EngineManager(threeEngine, cannonEngine);

const positionHelper = new PositionHelper();
const blockSizeManager = new BlockSizeManager();

const blockGenerator = new BlockGenerator(positionHelper, blockSizeManager);

const game = new Game(engineManager, eventEmitter);

eventEmitter.addListener(RUN_GAME, game.runAnimateLoop);
eventEmitter.addListener(CREATE_BLOCK, blockGenerator.generateNewBlock);

eventEmitter.addListener(SYNC_BLOCK_WITH_ENGINE, threeEngine.addObjectToScene);
eventEmitter.addListener(SYNC_BLOCK_WITH_ENGINE, cannonEngine.addBody);

eventEmitter.addListener(TOGGLE_AXIS, game.toggleAxes);

eventEmitter.addListener(ANIMATE_BLOCK, blockGenerator.changePositionInLastBlock)

window.addEventListener('DOMContentLoaded', () => {
    eventEmitter.emit(CREATE_BLOCK);
    eventEmitter.emit(RUN_GAME);

    const gameBlock = blockGenerator.getLastBlockFromQueue();

    eventEmitter.emit(SYNC_BLOCK_WITH_ENGINE, gameBlock);
    // eventEmitter.emit();
})

window.addEventListener('click', () => {
    eventEmitter.emit(CREATE_BLOCK);
    eventEmitter.emit(TOGGLE_AXIS);

    const gameBlock = blockGenerator.getLastBlockFromQueue();

    eventEmitter.emit(SYNC_BLOCK_WITH_ENGINE, gameBlock);
    eventEmitter.emit(ANIMATE_BLOCK);
})
