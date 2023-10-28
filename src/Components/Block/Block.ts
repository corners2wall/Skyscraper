import { BoxGeometry, Color, Mesh, MeshStandardMaterial } from "three";
import BlockSizeManager from "./BlockSizeManager";
import PositionHelper from "../PositionHelper";
import { BlockSize } from "../../Types/common";

export default class Block extends Mesh {
    private positionHelper: PositionHelper;

    constructor(positionHelper: PositionHelper, blockSizeManager: BlockSizeManager) {
        super();
        const blockSize = this.mapBlockSizeToBoxGeometry(blockSizeManager.getSizes());
        this.positionHelper = positionHelper;
        this.material = new MeshStandardMaterial({ color: new Color(`hsl(${30 + positionHelper.getY() * 4}, 100%, 50%)`) });
        this.geometry = new BoxGeometry(...blockSize);
        this.setPosition();
    }

    private mapBlockSizeToBoxGeometry({ width, height, depth }: BlockSize) {
        return [width, height, depth];
    }

    private setPosition() {
        this.position.set(this.positionHelper.getX(), this.positionHelper.getY(), this.positionHelper.getZ())
    }

}