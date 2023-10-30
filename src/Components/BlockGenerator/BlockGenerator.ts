import { Axis } from "../../Types/common";
import BoxHelper from "../../Utils/BoxHelper";
import { IntersectionHelper } from "../../Utils/IntersectionHelper";
import Block from "../Block/Block";
import BlockSizeManager from "../Block/BlockSizeManager";
import PhysicBlock from "../Block/PhysicBlock";
import UiBlock from "../Block/UiBlock";
import PositionHelper from "../PositionHelper";

export default abstract class BlockGenerator {
  protected intersectionHelper = IntersectionHelper
  protected boxHelper = BoxHelper

  constructor(
    protected positionHelper: PositionHelper,
    protected blockSizeManager: BlockSizeManager,
  ) {
    this.blockSizeManager = blockSizeManager;
    this.positionHelper = positionHelper;
  }

  public template(axis: Axis, mass: number) {
    this.setPosition(axis);
    this.setSize(axis);

    const block = this.generateBlock(mass);
  }

  private generateBlock(mass: number): Block {
    const position = this.positionHelper.getPosition();
    const size = this.blockSizeManager.getSizes();

    const uiBlock = new UiBlock(position, size);
    const physicBlock = new PhysicBlock(position, size, mass);

    return new Block(uiBlock, physicBlock);
  }

  protected abstract setPosition(axis: Axis): void

  protected abstract setSize(axis: Axis): void
}
