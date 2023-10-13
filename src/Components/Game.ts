type Axes = 'x' | 'z'
interface BlockSize {
    width: number,
    height: number,
    depth: number,
}

export default class Game {
    private isGameStarted: boolean
    private axes: Axes;
    private activeBlock: BlockSize;

    constructor() {
        this.isGameStarted = false;
        this.axes = 'x';
        this.activeBlock = {
            width: 3,
            height: 1,
            depth: 3
        }
    }

    public setIsGameStarted(value: boolean) {
        this.isGameStarted = value;
    }

    public getIsGameStarted() {
        return this.isGameStarted;
    }

    public getAxes() {
        return this.axes;
    }

    public setAxes(axes: Axes) {
        this.axes = axes;
    }

    public getBlockHeight() {
        return this.activeBlock.height
    }

    public setBlockHeight(height: number) {
        this.activeBlock.height = height;
    }

    public getBlockWidth() {
        return this.activeBlock.width;
    }

    public setBlockWidth(width: number) {
        return this.activeBlock.width = width;
    }

    public getBlockDepth() {
        return this.activeBlock.depth;
    }

    public setBlockDepth(depth: number) {
        this.activeBlock.depth = depth
    }

}