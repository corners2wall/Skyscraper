import GameBlock from "../GameBlock";
import PositionHelper from "../PositionHelper";
import BlockSizeManager from "./BlockSizeManager";

export default class BlockGenerator {
    constructor(
        private positionHelper: PositionHelper,
        private blockSizeManager: BlockSizeManager
    ) {

    }

    generateNewBlock() {
        return new GameBlock(this.positionHelper, this.blockSizeManager);
    }
}