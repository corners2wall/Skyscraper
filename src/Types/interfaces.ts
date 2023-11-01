import { ObjectPosition, Size } from './common'

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
