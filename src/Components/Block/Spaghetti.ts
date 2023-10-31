import { BLOCK_MASS } from "../../Const/Common";
import Block from "./Block";
import PositionHelper from "../PositionHelper";
import BlockSizeManager from "./BlockSizeManager";
import PhysicBlock from "./PhysicBlock";
import UiBlock from "./UiBlock";
import EventEmitter from "../../Utils/EventEmitter";
import { ADD_BLOCK_IN_STACK, SYNC_BLOCK_WITH_ENGINE } from "../../Const/actions";
import { BlockCommand } from "../../Types/common";

export default class Spaghetti {
  private command: BlockCommand;

  constructor(
    // ToDo: remove from here, pass as parameters into generateNewBlock function
    private positionHelper: PositionHelper,
    private blockSizeManager: BlockSizeManager,
    private eventEmitter: EventEmitter,
  ) {
    this.generateBlock = this.generateBlock.bind(this);
    this.generateBlockPart = this.generateBlockPart.bind(this);
    this.command
  }

  public generateBlock() {
    const position = this.positionHelper.getPosition();
    const size = this.blockSizeManager.getSizes();

    const uiBlock = new UiBlock(position, size);
    const physicBlock = new PhysicBlock(position, size);

    const block = new Block(uiBlock, physicBlock);

    this.eventEmitter.emit(ADD_BLOCK_IN_STACK, block);
    this.eventEmitter.emit(SYNC_BLOCK_WITH_ENGINE, block);
  }

  // ???
  public generateBlockPart() {
    const position = this.positionHelper.getPosition();
    const size = this.blockSizeManager.getSizes();

    const uiBlock = new UiBlock(position, size);
    const physicBlock = new PhysicBlock(position, size, BLOCK_MASS);

    const block = new Block(uiBlock, physicBlock);

    this.eventEmitter.emit(ADD_BLOCK_IN_STACK, block);
    this.eventEmitter.emit(SYNC_BLOCK_WITH_ENGINE, block);
  }
}
