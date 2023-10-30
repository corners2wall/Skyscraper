import BlockGenerator from "./BlockGenerator";
import PositionHelper from "../PositionHelper";
import BlockSizeManager from "../Block/BlockSizeManager";
import { Axis } from "../../Types/common";

export default class StableBlockGenerator extends BlockGenerator {
  constructor(positionHelper: PositionHelper, blockSizeManager: BlockSizeManager) {
    super(positionHelper, blockSizeManager)
  }

  protected setPosition(axis: Axis): void {
    const position = this.positionHelper.getPosition();

    const newPosition = { ...position, }
  }

  protected setSize(axis: Axis): void {

  }

  private getIntersection(axis: Axis) {
    const box = this.boxHelper.wrapMeshToBox();
    const lines = this.boxHelper.getAxisLine(box);
  }
}
