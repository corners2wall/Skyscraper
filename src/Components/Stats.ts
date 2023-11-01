import { decorate, injectable } from 'inversify'
import StatsJs from 'stats.js'

decorate(injectable(), StatsJs)

@injectable()
export default class Stats extends StatsJs {
  constructor() {
    super()
    this.showPanel(0)
    document.body.appendChild(this.dom)
  }
}
