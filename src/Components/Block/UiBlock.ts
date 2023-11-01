import { BoxGeometry, Color, Mesh, MeshStandardMaterial } from 'three'

import { Size, ObjectPosition } from '../../Types/common'

export default class UiBlock extends Mesh<BoxGeometry, MeshStandardMaterial> {
  constructor({ x, y, z }: ObjectPosition, { width, depth, height }: Size) {
    super(new BoxGeometry(), new MeshStandardMaterial())

    this.position.set(x, y, z)
    this.geometry.scale(width, height, depth)
    this.material.color = this.generateColor(y)
  }

  private generateColor(value: number): Color {
    return new Color(`hsl(${30 + value * 4}, 100%, 50%)`)
  }
}
