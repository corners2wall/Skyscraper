import { BLOCK_SPEED } from "../../Const/Common";
import { Axis } from "../../Types/common";
import Block from "./Block";

export default class BlockStack {
  private blocks: Block[];

  constructor() {
    this.blocks = [];
    this.addBlock = this.addBlock.bind(this);
    this.syncBlockPosition = this.syncBlockPosition.bind(this);
    this.getLastBlocks = this.getLastBlocks.bind(this);
    this.changePositionInLastBlock = this.changePositionInLastBlock.bind(this);
    this.removeBlock = this.removeBlock.bind(this);
  }

  public addBlock(block: Block) {
    this.blocks.push(block);
  }

  public getLastBlocks(n: number): Block[] {
    const blocks = this.getBlocks();

    return blocks.slice(Math.max(blocks.length - n, 0))
  }

  public removeBlock(removedBlock: Block) {
    const blocks = this.getBlocks().filter(block => block !== removedBlock);

    this.setBlocks(blocks);
  }

  private getBlocks() {
    return this.blocks
  }

  private setBlocks(blocks: Block[]) {
    this.blocks = blocks
  }

  // ToDo: remove from here
  public syncBlockPosition() {
    const blocks = this.getBlocks();

    blocks.forEach((block) => block.syncPosition())
  }
  // ToDo: remove from here
  public changePositionInLastBlock({ axis }: { axis: Axis }) {
    const [lastBlock] = this.getLastBlocks(1);

    const physicBlock = lastBlock.getPhysicBlock();
    physicBlock.position[axis] = physicBlock.position[axis] + BLOCK_SPEED;
    lastBlock.syncPosition();
  }
}
