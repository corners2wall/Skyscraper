import threeEngine from './Components/Three';
import cannonEngine from './Components/Cannon';
import EngineManager from './Components/EngineManager';
import Game from './Components/Game';

const engineManager = new EngineManager(threeEngine, cannonEngine);

const game = new Game(engineManager);

game.runAnimateLoop();
