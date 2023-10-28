import { BLOCK_SPEED } from "../../Consts/Common";
import { Axis } from "../../Types/common";
import GameBlock from "../GameBlock";
import PositionHelper from "../PositionHelper";
import BlockSizeManager from "./BlockSizeManager";

// ToDo: this class do two things: 1 - create blocks and store them.
// Fix this behavior
export default class BlockGenerator {
    private blocks: GameBlock[];

    constructor(
        private positionHelper: PositionHelper,
        private blockSizeManager: BlockSizeManager
    ) {
        this.blocks = [];
        this.generateNewBlock = this.generateNewBlock.bind(this);
        this.syncBlockPosition = this.syncBlockPosition.bind(this);
        this.getLastBlock = this.getLastBlock.bind(this);
        this.changePositionInLastBlock = this.changePositionInLastBlock.bind(this);
        this.makeStable = this.makeStable.bind(this);
        this.removeBlock = this.removeBlock.bind(this);
    }

    public generateNewBlock() {
        const gameBlock = new GameBlock(this.positionHelper, this.blockSizeManager);
        // debugger;
        // ToDo move from here 
        this.addGameBlockInBlocks(gameBlock);
    }

    public getLastBlock(): GameBlock {
        return this.blocks[this.blocks.length - 1]
    }

    public getTwoLastBlock(): GameBlock[] {
        const blocks = this.getBlocks();

        return blocks.slice(Math.max(blocks.length - 2, 0))
    }

    public getBlocks() {
        return this.blocks
    }

    public setBlocks(gameBlocks: GameBlock[]) {
        this.blocks = gameBlocks
    }

    public syncBlockPosition() {
        const blocks = this.getBlocks();

        blocks.forEach((block) => block.syncPosition())
    }

    public makeStable() {
        const lastBlock = this.getLastBlock();

        const physicBlock = lastBlock.getPhysicBlock();

        physicBlock.setMass(10);
    }

    public changePositionInLastBlock({ axis }: { axis: Axis }) {
        const lastBlock = this.getLastBlock();

        const physicBlock = lastBlock.getPhysicBlock();
        physicBlock.position[axis] = physicBlock.position[axis] + BLOCK_SPEED;
        lastBlock.syncPosition();
    }

    public removeBlock(gameBlock: GameBlock) {
        const blocks = this.getBlocks().filter(block => block !== gameBlock);

        this.setBlocks(blocks);
    }

    private addGameBlockInBlocks(gameBlock: GameBlock) {
        this.blocks.push(gameBlock);
    }

}