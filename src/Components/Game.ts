import EngineManager from "./EngineManager";

type Axes = 'x' | 'z'

export default class Game {
    private isGameStarted: boolean;
    private engineManager: EngineManager;
    private axes: Axes;

    constructor(engineManager: EngineManager) {
        this.axes = 'x'
        this.isGameStarted = false;
        this.engineManager = engineManager;
    }

    public runAnimateLoop() {
        this.engineManager.animate();

        requestAnimationFrame(this.runAnimateLoop.bind(this));
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