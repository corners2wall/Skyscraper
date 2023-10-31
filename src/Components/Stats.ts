import StatsJs from 'stats.js'

export default class Stats extends StatsJs {
  constructor() {
    super()
    this.showPanel(0)
    document.body.appendChild(this.dom)
  }
}
