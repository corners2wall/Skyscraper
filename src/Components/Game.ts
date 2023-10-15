type Axes = 'x' | 'z'

export default class Game {
    private isGameStarted: boolean
    private axes: Axes;

    constructor() {
        this.isGameStarted = false;
        this.axes = 'x'

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

    public toggleAxes() {
        this.axes = this.axes === 'x' ? 'z' : 'x'
    }

}