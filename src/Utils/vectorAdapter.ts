import { Vec3 } from "cannon-es";

export default function vectorAdapter(vector: Vec3): [x: number, y: number, z: number] {
    return [vector.x, vector.y, vector.z];
}