import { Box3, Mesh } from "three";

export default function wrapMeshToBox(mesh: Mesh): Box3 {
    return new Box3().setFromObject(mesh);
}