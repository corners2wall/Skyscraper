import { Box3 } from "three";
import { Axis, Line } from "../Types/common";

export default function getAxisLine(box3: Box3, axis: Axis): Line {
    const start = box3.min[axis];
    const end = box3.max[axis];

    return ({ start, end });
}
