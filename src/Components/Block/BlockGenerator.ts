import GameBlock from "../GameBlock";
import PositionHelper from "../PositionHelper";
import BlockSizeManager from "./BlockSizeManager";

// ToDo: this class do two things: 1 - create blocks and store them.
// Fix this behavior
export default class BlockGenerator {
    private queue: GameBlock[];

    constructor(
        private positionHelper: PositionHelper,
        private blockSizeManager: BlockSizeManager
    ) {
        this.queue = [];
        this.generateNewBlock = this.generateNewBlock.bind(this);
        this.getLastBlockFromQueue = this.getLastBlockFromQueue.bind(this);
        this.changePositionInLastBlock = this.changePositionInLastBlock.bind(this);
    }

    public generateNewBlock() {
        const gameBlock = new GameBlock(this.positionHelper, this.blockSizeManager);
        // debugger;
        // ToDo move from here 
        this.addGameBlockInQueue(gameBlock);
    }

    public getLastBlockFromQueue(): GameBlock {
        return this.queue[this.queue.length - 1]
    }

    public changePositionInLastBlock({ axis }) {
        const lastBlock = this.getLastBlockFromQueue();

        const physicBlockPosition = lastBlock.getPhysicBlock().position;
        debugger;
    }

    private addGameBlockInQueue(gameBlock: GameBlock) {
        this.queue.push(gameBlock);
    }
}