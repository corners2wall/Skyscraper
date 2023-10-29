import { Quaternion, Vec3 } from "cannon-es";
import { Positions } from "../../Types/common";
import UiBlock from "./UiBlock";
import BlockSizeManager from "./BlockSizeManager";
import PhysicBlock from "./PhysicBlock";
import PositionHelper from "../PositionHelper";

export default class Block {
    private uiBlock: UiBlock;
    private physicBlock: PhysicBlock;

    constructor(positionHelper: PositionHelper, blockSizeManager: BlockSizeManager, mass = 0) {
        this.uiBlock = new UiBlock(positionHelper, blockSizeManager);
        this.physicBlock = new PhysicBlock(positionHelper, blockSizeManager, mass);
    }

    public syncPosition() {
        this.uiBlock.position.set(...this.convertVectorToArray(this.physicBlock.position));
        this.uiBlock.quaternion.set(...this.convertQuaternionToArray(this.physicBlock.quaternion))
    }

    public changeBlockPosition(positions: Positions) {
        this.physicBlock.position.set(...positions);
    }

    public getUiBlock() {
        return this.uiBlock
    }

    public getPhysicBlock() {
        return this.physicBlock
    }

    private convertVectorToArray({x,y,z}: Vec3): Positions {
        return [x, y, z];
    }

    private convertQuaternionToArray({x,y,z,w}: Quaternion): [x: number, y: number, z: number, w: number] {
        return [x, y, z, w];
    }
}