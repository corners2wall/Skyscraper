import { CHANGE_BLOCK_SIZE, CHANGE_POSITION } from "../../Const/actions";
import { BlockCommand, BlockSize, ObjectPosition } from "../../Types/common";
import EventEmitter from "../../Utils/EventEmitter";

export default abstract class BlockTemplate implements BlockCommand {
  constructor(private eventEmitter: EventEmitter) { }

  protected execute() {
    const size = this.findSize();
    const position = this.findPosition();

    this.eventEmitter.emit(CHANGE_POSITION, position);
    this.eventEmitter.emit(CHANGE_BLOCK_SIZE, size);
  }

  protected abstract findSize(): BlockSize

  protected abstract findPosition(): ObjectPosition
}
