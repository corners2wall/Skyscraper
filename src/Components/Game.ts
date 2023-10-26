import { ANIMATE_BLOCK } from "../Consts/actions";
import EventEmitter from "../Utils/EventEmitter";
import EngineManager from "./EngineManager";

type Axes = 'x' | 'z'

// Seems like god object
export default class Game {
    private axes: Axes;
    private isGameStarted = false;

    constructor(
        private engineManager: EngineManager,
        private eventEmitter: EventEmitter
    ) {
        this.axes = 'x'
        this.toggleAxes = this.toggleAxes.bind(this);
        this.runAnimateLoop = this.runAnimateLoop.bind(this);
    }

    public runAnimateLoop() {
        const axis = this.getAxes();

        this.engineManager.animate();

        if (this.isGameStarted) {
            this.eventEmitter.emit(ANIMATE_BLOCK, { axis });
        }

        requestAnimationFrame(this.runAnimateLoop);
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