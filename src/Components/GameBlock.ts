import { Quaternion, Vec3 } from "cannon-es";
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

    constructor(positionHelper: PositionHelper, blockSizeManager: BlockSizeManager, mass = 0) {
        this.block = new Block(positionHelper, blockSizeManager);
        this.physicBlock = new PhysicBlock(positionHelper, blockSizeManager, mass);
    }

    public syncPosition() {
        this.block.position.set(...this.convertVectorToArray(this.physicBlock.position));
        this.block.quaternion.set(...this.convertQuaternionToArray(this.physicBlock.quaternion))
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

    private convertVectorToArray(vector: Vec3): Positions {
        return [vector.x, vector.y, vector.z];
    }

    private convertQuaternionToArray(quaternion: Quaternion): [x: number, y: number, z: number, w: number] {
        return [quaternion.x, quaternion.y, quaternion.z, quaternion.w];
    }
}