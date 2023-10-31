import { Axis, BlockCommand } from "../../Types/common";
import BoxHelper from "../../Utils/BoxHelper";
import { IntersectionHelper } from "../../Utils/IntersectionHelper";
import Block from "../Block/Block";
import PhysicBlock from "../Block/PhysicBlock";
import UiBlock from "../Block/UiBlock";

export default abstract class BlockGenerator {
  protected intersectionHelper = IntersectionHelper
  protected boxHelper = BoxHelper
  private command: BlockCommand

  constructor(
  ) {
  }

  public template(axis: Axis, mass: number) {
    const { position, size } = this.command.execute();

    return this.generateBlock(position, size, mass);
  }


  private generateBlock(position, size, mass: number): Block {
    const uiBlock = new UiBlock(position, size);
    const physicBlock = new PhysicBlock(position, size, mass);

    return new Block(uiBlock, physicBlock);
  }

  public setCommand(command: BlockCommand) {
    this.command = command;
  }
}
