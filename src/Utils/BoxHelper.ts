import { Box3, Mesh } from "three";
import { MinMaxValues } from "../Types/common";

export default class BoxHelper {
    static getAxisLine(box3: Box3): MinMaxValues {
        const x = { start: box3.min.x, end: box3.max.x }
        const y = { start: box3.min.y, end: box3.max.y }
        const z = { start: box3.min.z, end: box3.max.z }

        return ({ x, y, z });
    }

    static wrapMeshToBox(mesh: Mesh): Box3 {
        return new Box3().setFromObject(mesh);
    }
}