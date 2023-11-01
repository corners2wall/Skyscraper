import { inject, injectable } from 'inversify'
import { Mesh } from 'three'

import { CHANGE_BLOCK_SIZE, CHANGE_POSITION } from '../../Const/actions'
import TYPES from '../../Inversify/types'
import {
  Axis,
  Size,
  Line,
  ObjectPosition,
  IntersectionSize,
} from '../../Types/common'
import { BlockCommand } from '../../Types/interfaces'
import AxisSizeMapper from '../../Utils/AxisSizeMapper'
import BoxHelper from '../../Utils/BoxHelper'
import EventEmitter from '../../Utils/EventEmitter'
import IntersectionHelper from '../../Utils/IntersectionHelper'
import BlockPosition from '../Block/BlockPosition'
import BlockSize from '../Block/BlockSize'

@injectable()
export default class StableBlockCommand implements BlockCommand {
  private intersectionHelper = IntersectionHelper

  private boxHelper = BoxHelper

  private axisSizeMapper = AxisSizeMapper

  constructor(
    @inject(TYPES.PositionHelper) private blockPosition: BlockPosition,
    @inject(TYPES.SizeHelper) private blockSize: BlockSize,
    @inject(TYPES.EventEmitter) private eventEmitter: EventEmitter,
  ) {}

  execute(axis: Axis, stableMesh: Mesh, animateMesh: Mesh) {
    const position = this.getPosition(axis, stableMesh, animateMesh)
    const size = this.getSize(axis, stableMesh, animateMesh)

    this.eventEmitter.emit(CHANGE_BLOCK_SIZE, size)
    this.eventEmitter.emit(CHANGE_POSITION, position)

    return { position, size }
  }

  private getPosition(
    axis: Axis,
    stableMesh: Mesh,
    animateMesh: Mesh,
  ): ObjectPosition {
    const { start } = this.findIntersection(axis, stableMesh, animateMesh)
    const position = this.blockPosition.getPosition()

    return { ...position, [axis]: start }
  }

  private getSize(axis: Axis, stableMesh: Mesh, animateMesh: Mesh): Size {
    const { size } = this.findIntersection(axis, stableMesh, animateMesh)
    const blockSize = this.blockSize.getSize()
    const sizeUnit = this.axisSizeMapper.axisToSize(axis)

    return { ...blockSize, [sizeUnit]: size }
  }

  private findIntersection(
    axis: Axis,
    stableMesh: Mesh,
    animateMesh: Mesh,
  ): IntersectionSize {
    const stableLine = this.getLineFromMesh(axis, stableMesh)
    const animateLine = this.getLineFromMesh(axis, animateMesh)

    return this.intersectionHelper.getLineIntersection(stableLine, animateLine)
  }

  private getLineFromMesh(axis: Axis, mesh: Mesh): Line {
    const box = this.boxHelper.wrapMeshToBox(mesh)
    const line = this.boxHelper.getAxisLine(box, axis)

    return line
  }
}
