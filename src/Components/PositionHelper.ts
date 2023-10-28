import { Axis } from "../Types/common";

export default class PositionHelper {
    private static X = 1.5;
    private static Y = 0;
    private static Z = 1.5;

    private x: number;
    private y: number;
    private z: number;

    constructor(x = PositionHelper.X, y = PositionHelper.Y, z = PositionHelper.Z) {
        this.x = x;
        this.y = y;
        this.z = z;

        this.setY = this.setY.bind(this);
        this.setPosition = this.setPosition.bind(this);
    }

    getPosition(): [x: number, y: number, z: number] {
        return [this.x, this.y, this.z]
    }

    // ToDo: Change signature
    setPosition({ x, y, z }: Record<Axis, number>) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    changeAxisPosition(axis: Axis, value: number) {
        this[axis] = value;
    }

    getY() {
        return this.y
    }

    setY(y: number) {
        this.y = y;
    }

    getX() {
        return this.x
    }

    setX(x: number) {
        this.x = x;
    }

    getZ() {
        return this.z
    }

    setZ(z: number) {
        this.z = z;
    }
}