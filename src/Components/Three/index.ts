import { Mesh, MeshBasicMaterial, PerspectiveCamera, Scene, SphereGeometry, WebGLRenderer } from "three";
import ThreeJsEngine from "./ThreeJsEngine";
import ThreeJsEngineBuilder from "./ThreeJsEngineBuilder";
import Light from "../ThreeLight/Light";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const directionalLight = new Light({ lightType: 'directional', position: [5, 6, 3] })

const ambientLight = new Light({ lightType: 'ambient' })

const camera = new PerspectiveCamera(65, window.innerWidth / window.innerHeight);

const canvas = document.querySelector('.canvas') as HTMLCanvasElement;

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

export default threeJsEngine;
