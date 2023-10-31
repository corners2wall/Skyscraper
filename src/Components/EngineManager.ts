import { Engine } from '../Types/common'

export default class EngineManager {
  private engines: Engine[]

  constructor(...engines: Engine[]) {
    this.engines = engines
    this.animate = this.animate.bind(this)
  }

  public animate() {
    this.engines.forEach((engine) => engine.render())
  }

  public addEngine(engine: Engine) {
    this.engines.push(engine)
  }

  public removeEngine(instance: Engine) {
    this.engines = this.engines.filter((engine) => engine !== instance)
  }
}
