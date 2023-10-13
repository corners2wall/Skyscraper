import {
    AmbientLight,
    Box3,
    BoxGeometry,
    Color,
    DirectionalLight,
    Mesh,
    MeshPhongMaterial,
    PerspectiveCamera,
    Scene,
    WebGLRenderer,
} from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import BlockManager from "./Components/BlockManager";
import Block from "./Components/Block";
import Game from "./Components/Game";


const canvas = document.querySelector(".canvas") as HTMLCanvasElement;

const scene = new Scene();

const camera = new PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight
);

camera.position.set(1, 2, 5);

const blockManager = new BlockManager();

const directionalLight = new DirectionalLight("white", 0.6);

directionalLight.position.set(5, 6, 3);

const ambientLight = new AmbientLight(0x404040, 0.9);

scene.add(ambientLight, directionalLight);

const renderer = new WebGLRenderer({ canvas });

camera.position.set(3.5, 4, 6);

renderer.setSize(window.innerWidth, window.innerHeight);
const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

renderer.render(scene, camera);

function animate() {
    requestAnimationFrame(animate);
    const speed = 0.1;
    const activeBlock = blockManager.getLastBlock();
    controls.update();

    activeBlock.position[current] += speed;

    renderer.render(scene, camera);
}

const game = new Game();

function wrapMeshToBox(mesh: Mesh): Box3 {
    return new Box3().setFromObject(mesh);
}

// predefine values

const initialBlock = new Block(1.5, 0, 1.5);

blockManager.addBlock(initialBlock);
scene.add(initialBlock);
renderer.render(scene, camera)

interface Line {
    start: number;
    end: number
}

interface Size {
    size: number,
    start: number,
}

function getIntersection(line1: Line, line2: Line): Size {
    if (line1.end < line2.start || line2.end < line1.start) {
        return ({ size: 0, start: 0 })
    }

    if (line2.start <= line1.start && line1.end >= line2.end) {
        const size = Math.abs(line2.end - line1.start);
        const start = line1.start + (size / 2);

        return ({ size, start })
    }

    if (line2.start >= line1.start && line1.end <= line2.end) {
        const size = Math.abs(line1.end - line2.start);
        const start = line2.start + (size / 2);

        return ({ size, start })
    }

    return ({ size: 0, start: 0 })
}

function getAxesLane(box3: Box3, axes: 'x' | 'z' | 'y'): Line {
    const start = box3.min[axes];
    const end = box3.max[axes];

    return ({start, end});
}

window.addEventListener("click", () => {
    const isGameStarted = game.getIsGameStarted();
    const blocks = blockManager.getAllBlocks();

    if (blocks.length > 1) {
        const animatedBlock = blocks[blocks.length - 1];
        const stableBlock = blocks[blocks.length - 2];

        const animatedBox3 = wrapMeshToBox(animatedBlock);
        const stableBox3 = wrapMeshToBox(stableBlock);

        const stableLine = getAxesLane(stableBox3, current);
        const animatedLine = getAxesLane(animatedBox3, current);

        const {size, start} = getIntersection(stableLine, animatedLine);

        scene.remove(animatedBlock);

        const block = new Block(start , y, 1.5);

        blockManager.addBlock(block);
        scene.add(block);
    }

    // const x = current === "x" ? -10 : 1.5;
    // const z = current === "z" ? -10 : 1.5;

    // current = current === "x" ? "z" : "x"; // fix that

    const activeBlock = new Block(-10, y, 1.5);
    camera.position.setY(camera.position.y + 1);

    blockManager.addBlock(activeBlock);

    scene.add(activeBlock);

    if (!isGameStarted) {
        game.setIsGameStarted(true);
        animate();
    }

});
