import { BLOCK_SPEED } from "../../Const/Common";
import { Axis } from "../../Types/common";
import Block from "./Block";
import PositionHelper from "../PositionHelper";
import BlockSizeManager from "./BlockSizeManager";

// ToDo: this class do two things: 1 - create blocks and store them.
// Fix this behavior
export default class Spaghetti  {
    private blocks: Block[];

    constructor(
        // ToDo: remove from here, pass as parameters into generateNewBlock function
        private positionHelper: PositionHelper,
        private blockSizeManager: BlockSizeManager
    ) {
        this.blocks = [];
        this.generateNewBlock = this.generateNewBlock.bind(this);
        this.syncBlockPosition = this.syncBlockPosition.bind(this);
        this.getLastBlock = this.getLastBlock.bind(this);
        this.changePositionInLastBlock = this.changePositionInLastBlock.bind(this);
        this.removeBlock = this.removeBlock.bind(this);
    }

    public generateNewBlock(mass: number) {
        const block = new Block(this.positionHelper, this.blockSizeManager, mass);

        // ToDo: move from here 
        this.addBlockInBlocks(block);
    }

    public getLastBlock(): Block {
        return this.blocks[this.blocks.length - 1]
    }

    public getTwoLastBlock(): Block[] {
        const blocks = this.getBlocks();

        return blocks.slice(Math.max(blocks.length - 2, 0))
    }

    public getBlocks() {
        return this.blocks
    }

    public setBlocks(blocks: Block[]) {
        this.blocks = blocks
    }

    public syncBlockPosition() {
        const blocks = this.getBlocks();

        blocks.forEach((block) => block.syncPosition())
    }

    public changePositionInLastBlock({ axis }: { axis: Axis }) {
        const lastBlock = this.getLastBlock();

        const physicBlock = lastBlock.getPhysicBlock();
        physicBlock.position[axis] = physicBlock.position[axis] + BLOCK_SPEED;
        lastBlock.syncPosition();
    }

    public removeBlock(removedBlock: Block) {
        const blocks = this.getBlocks().filter(block => block !== removedBlock);

        this.setBlocks(blocks);
    }

    private addBlockInBlocks(block: Block) {
        this.blocks.push(block);
    }

}

export class BlockGenerator {
    public static generateBox() {

    }
}