import { injectable, multiInject } from 'inversify'

import { Engine } from '../Types/interfaces'

@injectable()
export default class EngineManager {
  private engines: Engine[]

  constructor(@multiInject('Engine') engines: Engine[]) {
    this.engines = engines
    this.animate = this.animate.bind(this)
  }

  public animate() {
    this.engines.forEach((engine) => engine.render())
  }
}
