import { Box, Plane, Shape, Sphere, Vec3 } from "cannon-es";

export type CannonShapeType = 'Sphere' | 'Box' | 'Plane';

export default class CannonShapeFactory {

    static create(type: CannonShapeType): Shape {
        if (type === 'Box') return new Box(new Vec3(1, 1, 1));
        if (type === 'Sphere') return new Sphere(1);
        if (type === 'Plane') return new Plane();

        throw new Error(`Unknown shapeType: ${type}`)
    }
}