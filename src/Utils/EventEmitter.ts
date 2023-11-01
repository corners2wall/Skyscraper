import { injectable } from 'inversify'

import { AnyFunction, MapKey } from '../Types/common'

@injectable()
export default class EventEmitter<Events extends MapKey = MapKey> {
  eventMap: Map<Events, AnyFunction[]>

  constructor() {
    this.eventMap = new Map()
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
