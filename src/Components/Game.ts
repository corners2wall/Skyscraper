import Stats from 'stats.js'

import { ANIMATE_ACTIVE_BLOCK, SYNC_POSITION } from '../Const/actions'
import { Axis } from '../Types/common'
import EventEmitter from '../Utils/EventEmitter'
import EngineManager from './EngineManager'

// Seems like god object
export default class Game {
  private axis: Axis

  // ToDo Maybe delete this property
  private isGameStarted = false

  constructor(
    private engineManager: EngineManager,
    private eventEmitter: EventEmitter,
    private stats: Stats,
  ) {
    this.axis = 'x'
    this.toggleAxes = this.toggleAxes.bind(this)
    this.runAnimateLoop = this.runAnimateLoop.bind(this)
    this.setIsGameStarted = this.setIsGameStarted.bind(this)
    this.getIsGameStarted = this.getIsGameStarted.bind(this)
  }

  public runAnimateLoop() {
    this.stats.begin()
    const axis = this.getAxis()

    this.engineManager.animate()

    this.eventEmitter.emit(SYNC_POSITION)

    this.eventEmitter.emit(ANIMATE_ACTIVE_BLOCK, { axis })

    this.stats.end()
    requestAnimationFrame(this.runAnimateLoop)
  }

  public getIsGameStarted() {
    return this.isGameStarted
  }

  public setIsGameStarted(isGameStarted: boolean) {
    this.isGameStarted = isGameStarted
  }

  public getAxis() {
    return this.axis
  }

  public setAxis(axes: Axis) {
    this.axis = axes
  }

  public toggleAxes() {
    this.axis = this.axis === 'x' ? 'z' : 'x'
  }
}
