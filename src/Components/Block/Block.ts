import { Quaternion, Vec3 } from "cannon-es";
import { Positions } from "../../Types/common";
import UiBlock from "./UiBlock";
import PhysicBlock from "./PhysicBlock";

export default class Block {
  constructor(
    private uiBlock: UiBlock,
    private physicBlock: PhysicBlock,
  ) { }

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

  private convertVectorToArray({ x, y, z }: Vec3): Positions {
    return [x, y, z];
  }

  private convertQuaternionToArray({ x, y, z, w }: Quaternion): [x: number, y: number, z: number, w: number] {
    return [x, y, z, w];
  }
}
