import { injectable } from 'inversify'

import { Size, SizeUnit } from '../../Types/common'
import { SizeHelper } from '../../Types/interfaces'

@injectable()
export default class BlockSize implements SizeHelper {
  constructor(
    private width: number,
    private height: number,
    private depth: number,
  ) {
    this.setSize = this.setSize.bind(this)
  }

  public getSize(): Size {
    return { width: this.width, height: this.height, depth: this.depth }
  }

  public setSize({ width, height, depth }: Size) {
    this.width = width
    this.height = height
    this.depth = depth
  }

  public setSizeBySizeUnit(sizeUnit: SizeUnit, value: number) {
    this[sizeUnit] = value
  }
}
