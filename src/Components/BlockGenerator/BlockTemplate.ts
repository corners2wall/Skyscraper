import { CHANGE_BLOCK_SIZE, CHANGE_POSITION } from '../../Const/actions'
import { Axis, Size, ObjectPosition } from '../../Types/common'
import EventEmitter from '../../Utils/EventEmitter'

// ToDo maybe use this instance of COMMAND?
export default class BlockTemplate {
  constructor(private eventEmitter: EventEmitter) {}

  public findSize(
    axis: Axis,
    size: Size,
    cb: (axis: Axis, size: Size) => Size,
  ): Size {
    const newSize = cb(axis, size)

    this.eventEmitter.emit(CHANGE_BLOCK_SIZE, newSize)

    return newSize
  }

  public findPosition(
    axis: Axis,
    position: ObjectPosition,
    cb: (axis: Axis, size: ObjectPosition) => ObjectPosition,
  ): ObjectPosition {
    const newPosition = cb(axis, position)

    this.eventEmitter.emit(CHANGE_POSITION, newPosition)

    return newPosition
  }
}
