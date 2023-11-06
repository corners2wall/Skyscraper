import { inject, injectable } from 'inversify'

import { BLOCK_MASS } from '../../Const/Common'
import { ADD_BLOCK_IN_STACK, SYNC_BLOCK_WITH_ENGINE } from '../../Const/actions'
import TYPES from '../../Inversify/types'
import { Factory } from '../../Types/common'
import EventEmitter from '../../Utils/EventEmitter'
import Block from './Block'
import BlockPosition from './BlockPosition'
import BlockSize from './BlockSize'
import PhysicBlock from './PhysicBlock'
import UiBlock from './UiBlock'

@injectable()
export default class BlockGenerator {
  constructor(
    @inject(TYPES.PositionHelper) private blockPosition: BlockPosition,
    @inject(TYPES.SizeHelper) private blockSize: BlockSize,
    @inject(TYPES.EventEmitter) private eventEmitter: EventEmitter,
    @inject(TYPES.BlockFactory)
    private blockFactory: Factory<Block, [UiBlock, PhysicBlock]>,
  ) {
    this.generateBlock = this.generateBlock.bind(this)
    this.generateBlockPart = this.generateBlockPart.bind(this)
  }

  public generateBlock() {
    const position = this.blockPosition.getPosition()
    const size = this.blockSize.getSize()

    const uiBlock = new UiBlock(position, size)
    const physicBlock = new PhysicBlock(position, size)

    const block = this.blockFactory(uiBlock, physicBlock)

    this.eventEmitter.emit(ADD_BLOCK_IN_STACK, block)
    this.eventEmitter.emit(SYNC_BLOCK_WITH_ENGINE, block)
  }

  // ???
  public generateBlockPart() {
    const position = this.blockPosition.getPosition()
    const size = this.blockSize.getSize()

    const uiBlock = new UiBlock(position, size)
    const physicBlock = new PhysicBlock(position, size, BLOCK_MASS)

    const block = this.blockFactory(uiBlock, physicBlock)

    this.eventEmitter.emit(ADD_BLOCK_IN_STACK, block)
    this.eventEmitter.emit(SYNC_BLOCK_WITH_ENGINE, block)
  }
}
