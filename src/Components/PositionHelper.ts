import {  ObjectPosition } from "../Types/common";

export default class PositionHelper {

    constructor(
        private x: number,
        private y: number,
        private z: number
    ) {
        this.setPosition = this.setPosition.bind(this);
    }

    getPosition(): ObjectPosition {
        return ({
            x: this.x,
            y: this.y,
            z: this.z,
        })
    }

    setPosition({ x, y, z }: ObjectPosition) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
}