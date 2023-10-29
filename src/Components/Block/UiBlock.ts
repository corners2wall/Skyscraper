import { BoxGeometry, Color, Mesh, MeshStandardMaterial } from "three";
import BlockSizeManager from "./BlockSizeManager";
import PositionHelper from "../PositionHelper";

export default class UiBlock extends Mesh {
    constructor(
        positionHelper: PositionHelper,
        blockSizeManager: BlockSizeManager,
        geometry: BoxGeometry,
        material: MeshStandardMaterial,
    ) {
        super(geometry, material);

        const {x,y,z} = positionHelper.getPosition()
        const {width, depth, height} =  blockSizeManager.getSizes();

        this.position.set(x,y,z);
        this.geometry.scale(width, height, depth)
        this.material.color = this.generateColor(y);
    }

    private generateColor(value: number): Color {
        return new Color(`hsl(${30 + value * 4}, 100%, 50%)`)
    }
}
