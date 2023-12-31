import { Body, Box, Vec3 } from 'cannon-es'

import { Size, ObjectPosition } from '../../Types/common'

export default class PhysicBlock extends Body {
  constructor(position: ObjectPosition, size: Size, mass = 0) {
    super({ mass })
    const shape = PhysicBlock.generateCubeShape(size)

    this.addShape(shape)
    this.setPosition(position)
  }

  private static generateCubeShape({ width, height, depth }: Size): Box {
    return new Box(new Vec3(width / 2, height / 2, depth / 2))
  }

  private setPosition({ x, y, z }: ObjectPosition) {
    this.position.set(x, y, z)
  }
}
