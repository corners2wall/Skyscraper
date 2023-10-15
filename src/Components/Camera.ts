import { PerspectiveCamera } from "three";

export default class Camera extends PerspectiveCamera {
    private floorCounter: number

    constructor() {
        super(75, window.innerWidth / window.innerHeight)

        this.position.set(4, 4, 7);
        this.floorCounter = 0
        this.lookAt(1, this.floorCounter, 0);
    }

    updateCameraPosition() {
        this.floorCounter = this.floorCounter + 1;
        this.lookAt(1, this.floorCounter, 0);
        this.position.setY(this.position.y + 1)
    }
}