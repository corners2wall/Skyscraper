import { injectable } from 'inversify'

import { AnyFunction, MapKey } from '../Types/common'
import { Emitter } from '../Types/interfaces'

@injectable()
export default class EventEmitter<Events extends MapKey = MapKey>
  implements Emitter<Events>
{
  eventMap: Map<Events, AnyFunction[]>

  constructor() {
    this.eventMap = new Map()
    // this.emit = this.emit.bind(this)
  }

  private get(key: Events) {
    return this.eventMap.get(key)
  }

  addListener(eventType: Events, listener: AnyFunction) {
    const callbacks = this.get(eventType) || []

    this.eventMap.set(eventType, [...callbacks, listener])
  }

  removeListener(eventType: Events, listener: AnyFunction) {
    ;(this.get(eventType) || []).filter((callback) => callback !== listener)
  }

  emit(eventType: Events, ...data: any) {
    const callbacks = this.get(eventType) || []

    callbacks.forEach((callback) => callback(...data))
  }
}
