import { Quaternion, Vec3 } from 'cannon-es'
import { injectable } from 'inversify'

import { Positions, GameBlock } from '../../Types/common'
import PhysicBlock from './PhysicBlock'
import UiBlock from './UiBlock'

@injectable()
export default class Block implements GameBlock {
  protected uiBlock: UiBlock

  protected physicBlock: PhysicBlock

  public syncPosition() {
    this.uiBlock.position.set(
      ...Block.convertVectorToArray(this.physicBlock.position),
    )
    this.uiBlock.quaternion.set(
      ...Block.convertQuaternionToArray(this.physicBlock.quaternion),
    )
  }

  public changeBlockPosition(positions: Positions) {
    this.physicBlock.position.set(...positions)
  }

  public getUiBlock() {
    return this.uiBlock
  }

  public setUiBlock(uiBlock: UiBlock) {
    this.uiBlock = uiBlock
  }

  public getPhysicBlock() {
    return this.physicBlock
  }

  public setPhysicBlock(physicBlock: PhysicBlock) {
    this.physicBlock = physicBlock
  }

  private static convertVectorToArray({ x, y, z }: Vec3): Positions {
    return [x, y, z]
  }

  private static convertQuaternionToArray({
    x,
    y,
    z,
    w,
  }: Quaternion): [x: number, y: number, z: number, w: number] {
    return [x, y, z, w]
  }
}
