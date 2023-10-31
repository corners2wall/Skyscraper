import { Body } from 'cannon-es'

import { Builder } from '../../Types/common'
import CannonEngine from './CannonEngine'

export default class CannonEngineBuilder implements Builder<CannonEngine> {
  private cannonEngine: CannonEngine

  constructor(cannonEngine: CannonEngine) {
    this.cannonEngine = cannonEngine
  }

  public build(): CannonEngine {
    return this.cannonEngine
  }

  public addItem(item: Body) {
    this.cannonEngine.addBody(item)

    return this
  }
}
