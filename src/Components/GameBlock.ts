import { Positions } from "../Types/common";
import quaternionAdapter from "../Utils/quaternionAdapter";
import vectorAdapter from "../Utils/vectorAdapter";
import Block from "./Block/Block";
import BlockSizeManager from "./Block/BlockSizeManager";
import PhysicBlock from "./PhysicBlock";
import PositionHelper from "./PositionHelper";

export default class GameBlock {
    private block: Block;
    private physicBlock: PhysicBlock;

    constructor(positionHelper: PositionHelper, blockSizeManager: BlockSizeManager) {
        this.block = new Block(positionHelper, blockSizeManager);
        this.physicBlock = new PhysicBlock(positionHelper, blockSizeManager);
    }

    public syncPosition() {
        // this.block.position.copy(this.physicBlock.position as any)
        // this.block.quaternion.copy(this.physicBlock.quaternion as any)
        // console.log(this.block.position);
        this.block.position.set(...vectorAdapter(this.physicBlock.position));
        this.block.quaternion.set(...quaternionAdapter(this.physicBlock.quaternion))
    }

    public changeBlockPosition(positions: Positions) {
        this.physicBlock.position.set(...positions);
    }

    public getBlock() {
        return this.block
    }

    public getPhysicBlock() {
        return this.physicBlock
    }
}