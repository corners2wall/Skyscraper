import {
    AmbientLight,
    AxesHelper,
    DirectionalLight,
    PerspectiveCamera,
    Scene,
    WebGLRenderer,
} from "three";
import BlockManager from "./Components/BlockManager";
import Block from "./Components/Block";
import Game from "./Components/Game";
import getIntersection from "./Utils/getIntersection";
import getAxisLine from "./Utils/getAxisLine";
import BlockSizeManager from "./Components/BlockSizeManager";
import PositionHelper from "./Components/PositionHelper";
import wrapMeshToBox from "./Utils/wrapMeshToBox";

const canvas = document.querySelector(".canvas") as HTMLCanvasElement;

const scene = new Scene();

const camera = new PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight
);

camera.position.set(1, 2, 5);

const blockManager = new BlockManager();
const blockSizeManager = new BlockSizeManager();
const positionHelper = new PositionHelper();
const game = new Game();

const directionalLight = new DirectionalLight("white", 0.6);

directionalLight.position.set(5, 6, 3);

const ambientLight = new AmbientLight('white', 0.8);

scene.add(ambientLight, directionalLight);

const renderer = new WebGLRenderer({ canvas });
const axes = new AxesHelper(5);

scene.add(axes);

camera.position.set(4, 4, 6);
camera.lookAt(1, 0, 0);

renderer.setSize(window.innerWidth, window.innerHeight);

function animate() {
    requestAnimationFrame(animate);
    const speed = 0.15;
    const activeBlock = blockManager.getLastBlock();

    activeBlock.position[game.getAxes()] += speed;

    renderer.render(scene, camera);
}
const initialBlock = new Block(positionHelper, blockSizeManager);

blockManager.addBlock(initialBlock);
scene.add(initialBlock);
renderer.render(scene, camera)

let y = 0;

game.toggleAxes();
window.addEventListener("click", () => {
    const isGameStarted = game.getIsGameStarted();
    const blocks = blockManager.getAllBlocks();

    if (blocks.length > 1) {
        const animatedBlock = blocks[blocks.length - 1];
        const stableBlock = blocks[blocks.length - 2];

        const animatedBox3 = wrapMeshToBox(animatedBlock);
        const stableBox3 = wrapMeshToBox(stableBlock);

        const stableLine = getAxisLine(stableBox3, game.getAxes());
        const animatedLine = getAxisLine(animatedBox3, game.getAxes());

        const { size, start } = getIntersection(stableLine, animatedLine);

        scene.remove(animatedBlock);

        if (game.getAxes() === 'x') {
            positionHelper.setX(start);
            blockSizeManager.setWidth(size);
        }

        if (game.getAxes() === 'z') {
            positionHelper.setZ(start);
            blockSizeManager.setDepth(size);
        }

        const block = new Block(positionHelper, blockSizeManager);


        blockManager.addBlock(block);
        scene.add(block);
    }
    game.toggleAxes();

    positionHelper.changeAxisPosition(game.getAxes(), -10);
    positionHelper.setY(positionHelper.getY() + 1);

    const activeBlock = new Block(positionHelper, blockSizeManager);
    camera.lookAt(1, y, 0);
    camera.position.setY(camera.position.y + 1);
    y = y + 1;

    blockManager.addBlock(activeBlock);
    scene.add(activeBlock);

    if (!isGameStarted) {
        game.setIsGameStarted(true);
        animate();
    }

});
