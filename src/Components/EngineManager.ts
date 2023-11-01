import { injectable } from 'inversify'

import { Engine } from '../Types/common'
import { AnimateManager } from '../Types/interfaces'

@injectable()
export default class EngineManager implements AnimateManager {
  private engines: Engine[]

  constructor(...engines: Engine[]) {
    this.engines = engines
    this.animate = this.animate.bind(this)
  }

  public animate() {
    this.engines.forEach((engine) => engine.render())
  }
}
