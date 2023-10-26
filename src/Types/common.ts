import { Broadphase, Solver, Vec3 } from "cannon-es";

export interface Line {
    start: number;
    end: number
}

export interface Size {
    size: number,
    start: number,
}

export type Axis = 'x' | 'y' | 'z';

export interface Engine {
    render(): void
}

export interface Builder<T> {
    build(): T
}

export type Positions = [x: number, y: number, z: number];

export interface WorldOptions {
    gravity?: Vec3;
    frictionGravity?: Vec3;
    allowSleep?: boolean;
    broadphase?: Broadphase;
    solver?: Solver;
    quatNormalizeFast?: boolean;
    quatNormalizeSkip?: number;
}

export interface Factory<T> {
    // register(key: string, constructor: T): void;
    create(type: string): T
}

export type MapKey = string | number | Symbol;
