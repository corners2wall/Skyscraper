import { Mesh } from 'three'

import { CHANGE_BLOCK_SIZE, CHANGE_POSITION } from '../../Const/actions'
import {
  Axis,
  BlockCommand,
  BlockSize,
  Line,
  ObjectPosition,
  Size,
} from '../../Types/common'
import AxisSizeMapper from '../../Utils/AxisSizeMapper'
import BoxHelper from '../../Utils/BoxHelper'
import EventEmitter from '../../Utils/EventEmitter'
import { IntersectionHelper } from '../../Utils/IntersectionHelper'
import BlockSizeManager from '../Block/BlockSizeManager'
import PositionHelper from '../PositionHelper'

export default class SliceBlockCommand implements BlockCommand {
  private intersectionHelper = IntersectionHelper

  private boxHelper = BoxHelper

  private axisSizeMapper = AxisSizeMapper

  constructor(
    private positionHelper: PositionHelper,
    private blockSizeManager: BlockSizeManager,
    private eventEmitter: EventEmitter,
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
    const position = this.positionHelper.getPosition()

    return { ...position, [axis]: start }
  }

  private getSize(axis: Axis, stableMesh: Mesh, animateMesh: Mesh): BlockSize {
    const { size } = this.findIntersection(axis, stableMesh, animateMesh)
    const blockSize = this.blockSizeManager.getSizes()
    const sizeUnit = this.axisSizeMapper.axisToSize(axis)

    return { ...blockSize, [sizeUnit]: size }
  }

  private findIntersection(
    axis: Axis,
    stableMesh: Mesh,
    animateMesh: Mesh,
  ): Size {
    const stableLine = this.getLineFromMesh(axis, stableMesh)
    const animateLine = this.getLineFromMesh(axis, animateMesh)

    return this.intersectionHelper.getLineDifference(stableLine, animateLine)
  }

  private getLineFromMesh(axis: Axis, mesh: Mesh): Line {
    const box = this.boxHelper.wrapMeshToBox(mesh)
    const line = this.boxHelper.getAxisLine(box, axis)

    return line
  }
}
