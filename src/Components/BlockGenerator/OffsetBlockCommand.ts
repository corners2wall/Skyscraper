import { DEFAULT_AXIS_OFFSET } from "../../Const/Common";
import { Axis, BlockCommand } from "../../Types/common";
import BlockSizeManager from "../Block/BlockSizeManager";
import PositionHelper from "../PositionHelper";

export default class OffsetBlockCommand implements BlockCommand {
  constructor(private positionHelper: PositionHelper, private blockSizeManager: BlockSizeManager) {

  }

  execute(axis: Axis) {
    const position = this.getPosition(axis);
    const size = this.getSize();

    return ({ position, size })
  }

  private getPosition(axis: Axis) {
    const { x, y, z } = this.positionHelper.getPosition();

    return ({ x, y: y + 1, z, [axis]: DEFAULT_AXIS_OFFSET })
  }

  private getSize() {
    const size = this.blockSizeManager.getSizes();

    return size;
  }
}
