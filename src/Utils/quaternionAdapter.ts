import { Quaternion } from "cannon-es";

export default function quaternionAdapter(quaternion: Quaternion): [x: number, y: number, z: number, w: number] {
    return [quaternion.x, quaternion.y, quaternion.z, quaternion.w];
}