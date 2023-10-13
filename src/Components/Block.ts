import { BoxGeometry, Color, Mesh, MeshStandardMaterial } from "three";
import BlockSizeManager from "./BlockSizeManager";
import PositionHelper from "./PositionHelper";

export default class Block extends Mesh {
    private positionHelper: PositionHelper;

    constructor(positionHelper: PositionHelper, blockSizeManager: BlockSizeManager) {
        super();
        this.positionHelper = positionHelper;
        this.material = new MeshStandardMaterial({ color: new Color(`hsl(${30 + positionHelper.getY() * 4}, 100%, 50%)`) });
        this.geometry = new BoxGeometry(...blockSizeManager.getSize());
        this.setPosition();
        // this.position.set(positionHelper.getX(),);
    }

    private setPosition() {
        this.position.set(this.positionHelper.getX(), this.positionHelper.getY(), this.positionHelper.getZ())
    }
}