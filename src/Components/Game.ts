type Axes = 'x' | 'z'
interface BlockSize {
    width: number,
    height: number,
    depth: number,
}

interface BlockPosition {
    x: number,
    y: number,
    z: number
}

export default class Game {
    private isGameStarted: boolean
    private axes: Axes;
    private blockSize: BlockSize;
    private blockPosition: BlockPosition;

    constructor() {
        this.isGameStarted = false;
        this.axes = 'x';
        this.blockSize = {
            width: 3,
            height: 1,
            depth: 3
        }
        this.blockPosition = {
            // x:
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
        return this.blockSize.height
    }

    public setBlockHeight(height: number) {
        this.blockSize.height = height;
    }

    public getBlockWidth() {
        return this.blockSize.width;
    }

    public setBlockWidth(width: number) {
        return this.blockSize.width = width;
    }

    public getBlockDepth() {
        return this.blockSize.depth;
    }

    public setBlockDepth(depth: number) {
        this.blockSize.depth = depth
    }

}