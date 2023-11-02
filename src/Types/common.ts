import { Broadphase, Solver, Vec3 } from 'cannon-es'
import { interfaces } from 'inversify'

import GameBlock from '../Components/Block/Block'

export interface Line {
  start: number
  end: number
}

export interface IntersectionSize {
  size: number
  start: number
}

export type Axis = 'x' | 'y' | 'z'

export type SizeUnit = 'width' | 'height' | 'depth'

export interface Builder<T> {
  build(): T
}

export type Positions = [x: number, y: number, z: number]

export type ObjectPosition = Record<Axis, number>

export type Size = Record<SizeUnit, number>

export interface WorldOptions {
  gravity?: Vec3
  frictionGravity?: Vec3
  allowSleep?: boolean
  broadphase?: Broadphase
  solver?: Solver
  quatNormalizeFast?: boolean
  quatNormalizeSkip?: number
}

export type MapKey = string | number | symbol

export interface GameBlockAdapter {
  addGameBlock(block: GameBlock): void
  removeGameBlock(block: GameBlock): void
}

export type AnyFunction = (...args: any[]) => any

export type Factory<
  T,
  U extends unknown[] = unknown[],
> = interfaces.SimpleFactory<T, U>
