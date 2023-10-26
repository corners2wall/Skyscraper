import threeEngine from './Components/Three';
import cannonEngine from './Components/Cannon';
import EngineManager from './Components/EngineManager';
import GameBlock from './Components/GameBlock';
import PositionHelper from './Components/PositionHelper';
import BlockSizeManager from './Components/Block/BlockSizeManager';
import EventEmitter from './Utils/EventEmitter';

const eventEmitter = new EventEmitter();

const engineManager = new EngineManager(threeEngine, cannonEngine);

const positionHelper = new PositionHelper();
const blockSizeManager = new BlockSizeManager();
const box = new GameBlock(positionHelper, blockSizeManager);

threeEngine.addObjectToScene(box.getBlock());
cannonEngine.addBody(box.getPhysicBlock());

function animate() {
    engineManager.animate();
    // const prevPosition = box.getPhysicBlock().position;
    // box.getPhysicBlock().position = new Vec3(prevPosition.x + 0.15, prevPosition.y, prevPosition.z);

    box.syncPosition();

    requestAnimationFrame(animate)
}

animate();

// const game = new Game(engineManager);

// game.runAnimateLoop();


window.addEventListener('click', () => {
    // eventEmitter.emit(RUN_GAME);
    // eventEmitter.emit('');
    // .emit('')
    // .emit('')
})
