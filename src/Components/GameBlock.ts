import quaternionAdapter from "../Utils/quaternionAdapter";
import vectorAdapter from "../Utils/vectorAdapter";
import Block from "./Block";
import BlockSizeManager from "./BlockSizeManager";
import PhysicBlock from "./PhysicBlock";
import PositionHelper from "./PositionHelper";

export default class GameBlock {
    private block: Block;
    private physicBlock: PhysicBlock;

    constructor(positionHelper: PositionHelper, blockSizeManager: BlockSizeManager) {
        this.block = new Block(positionHelper, blockSizeManager);
        this.physicBlock = new PhysicBlock(positionHelper, blockSizeManager);
    }

    syncPosition() {
        this.block.position.set(...vectorAdapter(this.physicBlock.position));
        this.block.quaternion.set(...quaternionAdapter(this.physicBlock.quaternion))
    }
}