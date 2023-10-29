import { BoxGeometry, Color, Mesh, MeshStandardMaterial } from "three";
import BlockSizeManager from "./BlockSizeManager";
import PositionHelper from "../PositionHelper";
import { BlockSize, ObjectPosition } from "../../Types/common";

// ToDo: pass instance material and geometry
export default class UiBlock extends Mesh {
    constructor(
        positionHelper: PositionHelper,
        blockSizeManager: BlockSizeManager
    ) {
        super();
        const sizes = this.mapBlockSizeToBoxGeometry(blockSizeManager.getSizes());
        const color = this.generateColor(positionHelper.getPosition());

        this.material = new MeshStandardMaterial({ color });
        this.geometry = new BoxGeometry(...sizes);

        this.setPosition(positionHelper.getPosition());
    }

    private mapBlockSizeToBoxGeometry({ width, height, depth }: BlockSize) {
        return [width, height, depth];
    }

    private setPosition({x, y, z}: ObjectPosition) {
        this.position.set(x, y, z);
    }

    private generateColor({y}: ObjectPosition): Color {
        return new Color(`hsl(${30 + y * 4}, 100%, 50%)`)
    }
}
