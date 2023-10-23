import { Camera, Scene, WebGLRenderer } from "three";
import ThreeJsEngine from "./ThreeJsEngine";
import ThreeJsEngineBuilder from "./ThreeJsEngineBuilder";
import Light from "../ThreeLight/Light";

const directionalLight = new Light({ lightType: 'directional', position: [5, 6, 3] })

const ambientLight = new Light({ lightType: 'ambient' })

const camera = new Camera();

const scene = new Scene();

const canvas = document.querySelector('.canvas') as HTMLCanvasElement;

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

export default threeJsEngine;
