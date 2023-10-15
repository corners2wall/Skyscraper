import {
    AmbientLight,
    DirectionalLight,
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
import Camera from "./Components/Camera";
import getSliceBlock from './Utils/getSliceBlock';
import * as CANNON from 'cannon-es'
import PhysicBlock from "./Components/PhysicBlock";
import vectorAdapter from "./Utils/vectorAdapter";
import quaternionAdapter from "./Utils/quaternionAdapter";

let world: CANNON.World;

initCannon();

const canvas = document.querySelector(".canvas") as HTMLCanvasElement;

const scene = new Scene();

const camera = new Camera();

const blockManager: [PhysicBlock, Block][] = []
const sliceBlockSizeManager = new BlockSizeManager();
const sliceArray: [PhysicBlock, Block][] = [];
const blockSizeManager = new BlockSizeManager();
const positionHelper = new PositionHelper();
const slicePositionHelper = new PositionHelper(1.5, 1, 1.5);
const game = new Game();

const directionalLight = new DirectionalLight("white", 0.9);

directionalLight.position.set(5, 6, 3);

const ambientLight = new AmbientLight('white', 1);

scene.add(ambientLight, directionalLight);

const renderer = new WebGLRenderer({ canvas });

renderer.setSize(window.innerWidth, window.innerHeight);

function animate() {
    world.fixedStep();
    requestAnimationFrame(animate);

    sliceArray.forEach(([physicBlock, block]) => {
        block.position.set(...vectorAdapter(physicBlock.position));
        block.quaternion.set(...quaternionAdapter(physicBlock.quaternion))
    })

    // blockManager.forEach(([physicBlock, block]) => {
    //     block.position.set(...vectorAdapter(physicBlock.position));
    //     block.quaternion.set(...quaternionAdapter(physicBlock.quaternion))
    // })

    const speed = 0.15;
    const [, activeBlock] = blockManager[blockManager.length - 1];

    activeBlock.position[game.getAxes()] += speed;

    renderer.render(scene, camera);
}
const initialBlock = new Block(positionHelper, blockSizeManager);
const physicBlock = new PhysicBlock(positionHelper, blockSizeManager)

blockManager.push([physicBlock, initialBlock]);

world.addBody(physicBlock)
scene.add(initialBlock);
renderer.render(scene, camera)

game.toggleAxes();
window.addEventListener("click", () => {
    const isGameStarted = game.getIsGameStarted();
    const blocks = blockManager;

    if (blocks.length > 1) {
        const [, animatedBlock] = blocks[blocks.length - 1];
        const [, stableBlock] = blocks[blocks.length - 2];

        const animatedBox3 = wrapMeshToBox(animatedBlock);
        const stableBox3 = wrapMeshToBox(stableBlock);

        const stableLine = getAxisLine(stableBox3, game.getAxes());
        const animatedLine = getAxisLine(animatedBox3, game.getAxes());

        const { size, start } = getIntersection(stableLine, animatedLine);

        // Generate Slice Block
        const { size: sliceSize, start: sliceStart } = getSliceBlock(stableLine, animatedLine);

        slicePositionHelper.setY(positionHelper.getY());
        slicePositionHelper.setZ(positionHelper.getZ());
        slicePositionHelper.setX(positionHelper.getX());

        slicePositionHelper.changeAxisPosition(game.getAxes(), sliceStart);

        if (game.getAxes() === 'x') {
            sliceBlockSizeManager.setWidth(sliceSize)
        }

        if (game.getAxes() === 'z') {
            sliceBlockSizeManager.setDepth(sliceSize)
        }

        const sliceBlock = new Block(slicePositionHelper, sliceBlockSizeManager)

        scene.add(sliceBlock)

        const physicBlock = new PhysicBlock(slicePositionHelper, sliceBlockSizeManager, 100);

        world.addBody(physicBlock);

        sliceArray.push([physicBlock, sliceBlock]);

        scene.remove(animatedBlock);

        positionHelper.changeAxisPosition(game.getAxes(), start);

        if (game.getAxes() === 'x') {
            blockSizeManager.setWidth(size);
        }

        if (game.getAxes() === 'z') {
            blockSizeManager.setDepth(size);
        }

        const block = new Block(positionHelper, blockSizeManager);
        //should be animated
        const physicBlockStable = new PhysicBlock(positionHelper, blockSizeManager, 100)

        blockManager.push([physicBlockStable, block]);

        world.addBody(physicBlockStable)
        scene.add(block);
    }
    game.toggleAxes();

    positionHelper.changeAxisPosition(game.getAxes(), -10);
    positionHelper.setY(positionHelper.getY() + 1);

    const activeBlock = new Block(positionHelper, blockSizeManager);
    const pb = new PhysicBlock(positionHelper, blockSizeManager)
    camera.updateCameraPosition();

    blockManager.push([pb, activeBlock]);
    scene.add(activeBlock);

    if (!isGameStarted) {
        game.setIsGameStarted(true);
        animate();
    }

});

function initCannon() {
    world = new CANNON.World({
        gravity: new CANNON.Vec3(0, -10, 0)
    })

    const groundShape = new CANNON.Plane();
    const ground = new CANNON.Body({ mass: 0 })
    ground.position.set(1, -1, 1)

    ground.addShape(groundShape);
    ground.quaternion.setFromEuler(-Math.PI / 2, 0, 0);

    world.addBody(ground);
}