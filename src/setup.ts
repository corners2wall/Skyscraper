import { AmbientLight, DirectionalLight, Renderer, Scene, WebGLRenderer } from "three";
import Camera from "./Components/Camera";
import CannonEngineBuilder from "./Components/Cannon/CannonEngineBuilder";
import EngineManager from "./Components/EngineManager";
import CannonEngine from "./Components/Cannon/CannonEngine";
import ThreeJsEngine from "./Components/Three/ThreeJsEngine";
import ThreeJsEngineBuilder from "./Components/Three/ThreeJsEngineBuilder";
import CannonItem from "./Components/Cannon/CannonItem";

/**
 * Setup Three.js
 */

const directionalLight = new DirectionalLight("white", 0.9);

directionalLight.position.set(5, 6, 3);

const ambientLight = new AmbientLight('white', 1);

const camera = new Camera();

const scene = new Scene();

const canvas = document.querySelector('.webgl') as HTMLCanvasElement;

const renderer = new WebGLRenderer({ canvas });

const defaultThreeJsEngine = new ThreeJsEngine(renderer);

const threeJsEngine = new ThreeJsEngineBuilder(defaultThreeJsEngine)
    .addItem(directionalLight)
    .addItem(ambientLight)
    .setCamera(camera)
    .setScene(scene)
    .build();


/**
 * Setup Cannon-es 
 */

const defaultCannonEngine = new CannonEngine();

const ground = new CannonItem('Plane');

const cannonEngine = new CannonEngineBuilder(defaultCannonEngine)
    .addItem(ground)
    .addItem()
    .build();

/**
 * Sync Cannon-es with Three.js
 */

const engineManager = new EngineManager(threeJsEngine, cannonEngine);

export default engineManager;