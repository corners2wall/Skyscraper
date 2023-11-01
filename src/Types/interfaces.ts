import { AnyFunction, MapKey, ObjectPosition, Size } from './common'

export interface Emitter<Events = MapKey> {
  addListener(eventType: Events, listener: AnyFunction): void
  removeListener(eventType: Events, listener: AnyFunction): void
  emit(eventType: Events, ...data: any): void
}

export interface BlockCommand {
  execute(...args: any[]): {
    position: ObjectPosition
    size: Size
  }
}

export interface PositionHelper {
  getPosition(): ObjectPosition
  setPosition(position: ObjectPosition): void
}

export interface SizeHelper {
  getSize(): Size
  setSize(size: Size): void
}

export interface Engine {
  render(): void
}

export interface AnimateManager {
  animate(): void
}
