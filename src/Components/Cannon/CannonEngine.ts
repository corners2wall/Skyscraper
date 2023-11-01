import { Body, World } from 'cannon-es'

import { WorldOptions } from '../../Types/common'
import { Engine } from '../../Types/interfaces'

export default class CannonEngine implements Engine {
  private world: World

  constructor(options?: WorldOptions) {
    this.world = new World(options)
    this.addBody = this.addBody.bind(this)
  }

  public render() {
    this.world.fixedStep()
  }

  public addBody(body: Body) {
    this.world.addBody(body)
  }

  public removeBody(body: Body) {
    this.world.removeBody(body)
  }
}
