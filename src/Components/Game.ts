import { ANIMATE_ACTIVE_BLOCK, SYNC_POSITION } from "../Consts/actions";
import EventEmitter from "../Utils/EventEmitter";
import EngineManager from "./EngineManager";

type Axes = 'x' | 'z'

// Seems like god object
export default class Game {
    private axis: Axes;
    // ToDo Maybe delete this property
    private isGameStarted = false;

    constructor(
        private engineManager: EngineManager,
        private eventEmitter: EventEmitter
    ) {
        this.axis = 'x'
        this.toggleAxes = this.toggleAxes.bind(this);
        this.runAnimateLoop = this.runAnimateLoop.bind(this);
        this.setIsGameStarted = this.setIsGameStarted.bind(this);
        this.getIsGameStarted = this.getIsGameStarted.bind(this);
    }

    public runAnimateLoop() {
        const axis = this.getAxis();

        this.engineManager.animate();

        this.eventEmitter.emit(SYNC_POSITION);

        this.eventEmitter.emit(ANIMATE_ACTIVE_BLOCK, { axis });

        requestAnimationFrame(this.runAnimateLoop);
    }

    public getIsGameStarted() {
        return this.isGameStarted;
    }

    public setIsGameStarted(isGameStarted: boolean) {
        this.isGameStarted = isGameStarted;
    }

    public getAxis() {
        return this.axis;
    }

    public setAxis(axes: Axes) {
        this.axis = axes;
    }

    public toggleAxes() {
        this.axis = this.axis === 'x' ? 'z' : 'x'
    }
}