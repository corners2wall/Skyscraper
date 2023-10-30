import { Body, Box, Vec3 } from 'cannon-es'
import { BlockSize, ObjectPosition } from '../../Types/common';

export default class PhysicBlock extends Body {
  constructor(
    position: ObjectPosition,
    size: BlockSize,
    mass = 0
  ) {
    super({ mass });
    const shape = this.generateCubeShape(size);

    this.addShape(shape);
    this.setPosition(position);
  }

  private generateCubeShape({ width, height, depth }: BlockSize): Box {
    return new Box(new Vec3(width / 2, height / 2, depth / 2))
  }

  private setPosition({ x, y, z }: ObjectPosition) {
    this.position.set(x, y, z)
  }
}
