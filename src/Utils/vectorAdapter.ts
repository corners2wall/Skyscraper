import { Vec3 } from "cannon-es";
import { Positions } from "../Types/common";

export default function vectorAdapter(vector: Vec3): Positions {
    return [vector.x, vector.y, vector.z];
}