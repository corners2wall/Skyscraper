import { DEFAULT_AXIS_OFFSET } from "../../Const/Common";
import { CHANGE_BLOCK_SIZE, CHANGE_POSITION } from "../../Const/actions";
import { Axis, BlockCommand } from "../../Types/common";
import EventEmitter from "../../Utils/EventEmitter";
import BlockSizeManager from "../Block/BlockSizeManager";
import PositionHelper from "../PositionHelper";

export default class OffsetBlockCommand implements BlockCommand {
  constructor(
    private positionHelper: PositionHelper,
    private blockSizeManager: BlockSizeManager,
    private eventEmitter: EventEmitter,
  ) { }

  execute(axis: Axis) {
    const position = this.getPosition(axis);
    const size = this.getSize();

    this.eventEmitter.emit(CHANGE_BLOCK_SIZE, size);
    this.eventEmitter.emit(CHANGE_POSITION, position);

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
