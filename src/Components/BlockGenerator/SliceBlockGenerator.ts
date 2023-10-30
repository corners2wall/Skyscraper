import { Axis } from "../../Types/common";
import BlockSizeManager from "../Block/BlockSizeManager";
import PositionHelper from "../PositionHelper";
import BlockGenerator from "./BlockGenerator";

export default class SliceBlockGenerator extends BlockGenerator {
  constructor(positionHelper: PositionHelper, blockSizeManager: BlockSizeManager) {
    super(positionHelper, blockSizeManager)
  }

  protected setPosition(axis: Axis): void {
  }

  protected setSize(): void {
  }
}
