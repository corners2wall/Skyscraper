import { PerspectiveCamera, Scene, WebGLRenderer } from "three";
import ThreeJsEngine from "./ThreeJsEngine";
import ThreeJsEngineBuilder from "./ThreeJsEngineBuilder";
import Light from "../ThreeLight/Light";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import ThreeJsEngineAdapter from "./ThreeJsEngineAdapter";

const directionalLight = new Light({ lightType: 'directional', position: [5, 6, 3] })

const ambientLight = new Light({ lightType: 'ambient' })

const camera = new PerspectiveCamera(65, window.innerWidth / window.innerHeight);

const canvas = document.querySelector('.canvas') as HTMLCanvasElement;

// ToDo: remove this
const o = new OrbitControls(camera, canvas);

camera.position.set(1, 1, 10);

const scene = new Scene();

// ToDo: move to entity
const renderer = new WebGLRenderer({ canvas, });
renderer.setSize(window.innerWidth, window.innerHeight);

const defaultThreeJsEngine = new ThreeJsEngine(renderer);

const threeJsEngine = new ThreeJsEngineBuilder(defaultThreeJsEngine)
    .setCamera(camera)
    .setScene(scene)
    .addItem(directionalLight.getLight())
    .addItem(ambientLight.getLight())
    .build();

export const threeEngineAdapter = new ThreeJsEngineAdapter(threeJsEngine);

export default threeJsEngine;
