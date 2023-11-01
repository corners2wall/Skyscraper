import { inject, injectable } from 'inversify'

import { DEFAULT_AXIS_OFFSET } from '../../Const/Common'
import { CHANGE_BLOCK_SIZE, CHANGE_POSITION } from '../../Const/actions'
import TYPES from '../../Inversify/types'
import { Axis } from '../../Types/common'
import { BlockCommand } from '../../Types/interfaces'
import EventEmitter from '../../Utils/EventEmitter'
import BlockPosition from '../Block/BlockPosition'
import BlockSize from '../Block/BlockSize'

@injectable()
export default class OffsetBlockCommand implements BlockCommand {
  constructor(
    @inject(TYPES.PositionHelper) private blockPosition: BlockPosition,
    @inject(TYPES.SizeHelper) private blockSize: BlockSize,
    @inject(TYPES.EventEmitter) private eventEmitter: EventEmitter,
  ) {}

  execute(axis: Axis) {
    const position = this.getPosition(axis)
    const size = this.getSize()

    this.eventEmitter.emit(CHANGE_BLOCK_SIZE, size)
    this.eventEmitter.emit(CHANGE_POSITION, position)

    return { position, size }
  }

  private getPosition(axis: Axis) {
    const { x, y, z } = this.blockPosition.getPosition()

    return { x, y: y + 1, z, [axis]: DEFAULT_AXIS_OFFSET }
  }

  private getSize() {
    const size = this.blockSize.getSize()

    return size
  }
}
