import { Scene, WebGLRenderer } from "three";
import ThreeJsEngine from "./ThreeJsEngine";
import ThreeJsEngineBuilder from "./ThreeJsEngineBuilder";
import Light from "../ThreeLight/Light";
import ThreeJsEngineAdapter from "./ThreeJsEngineAdapter";
import Camera from "../Camera";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const directionalLight = new Light({ lightType: 'directional', position: [1, 2, 6] });
directionalLight.setIntensity(2);
// const hel = new  DirectionalLightHelper(directionalLight.getLight());

const ambientLight = new Light({ lightType: 'ambient' })


export const camera = new Camera();

const canvas = document.querySelector('.canvas') as HTMLCanvasElement;

// export const or = new OrbitControls(camera, canvas);

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
    // .addItem(hel)
    .build();

export const threeEngineAdapter = new ThreeJsEngineAdapter(threeJsEngine);

export default threeJsEngine;
