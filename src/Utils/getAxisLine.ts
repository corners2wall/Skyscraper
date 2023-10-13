import { Box3 } from "three";
import { Line } from "../Types/common";

export default function getAxisLine(box3: Box3, axes: 'x' | 'z' | 'y'): Line {
    const start = box3.min[axes];
    const end = box3.max[axes];

    return ({ start, end });
}
