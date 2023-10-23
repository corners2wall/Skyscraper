import { Plane, Shape, Sphere, Vec3 } from "cannon-es";
import { Factory } from "../../Types/common";
import { Box } from "shapes/Box";

export type CannonShapeType = 'Sphere' | 'Box' | 'Plane';

// ToDo: redo
export default class CannonShapeFactory {

    static create(type: CannonShapeType): Shape {
        if (type === 'Box') return new Box(new Vec3(1, 1, 1));
        if (type === 'Sphere') return new Sphere(1);
        if (type === 'Plane') return new Plane();

        throw new Error(`Unknown shapeType: ${type}`)
    }
    // private factoryMap: Map<string, Shape>

    // constructor() {
    //     this.factoryMap = new Map();
    // }

    // register(type: string, constructor: Shape): void {
    //     this.factoryMap.set(type, constructor);
    // }

    // public create(type: string): Shape {
    //     const Constructor = this.factoryMap.get(type);

    //     if (!Constructor) throw new Error('')

    //     Constructor;

    //     return new Constructor();
    // }
}