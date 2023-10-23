import * as CANNON from 'cannon-es';
import CannonShapeFactory, { CannonShapeType } from './CannonShapeFactory';

interface CannonItemConstructorOptions {
    collisionFilterGroup?: number;
    collisionFilterMask?: number;
    collisionResponse?: boolean;
    position?: CANNON.Vec3;
    velocity?: CANNON.Vec3;
    mass?: number;
    material?: CANNON.Material;
    linearDamping?: number;
    type?: CANNON.BodyType;
    allowSleep?: boolean;
    sleepSpeedLimit?: number;
    sleepTimeLimit?: number;
    quaternion?: CANNON.Quaternion;
    angularVelocity?: CANNON.Vec3;
    fixedRotation?: boolean;
    angularDamping?: number;
    linearFactor?: CANNON.Vec3;
    angularFactor?: CANNON.Vec3;
    shape?: CANNON.Shape;
    isTrigger?: boolean;
}

// ToDo: make automatically added to the world
export default class CannonItem extends CANNON.Body {
    constructor(type: CannonShapeType, options?: CannonItemConstructorOptions) {
        super(options);

        this.setShape(type);
    }

    private setShape(type: CannonShapeType) {
        const shape = CannonShapeFactory.create(type);
        super.addShape(shape)
    }

    public setPosition(x: number, y: number, z: number) {
        this.position.set(x, y, z)
    }
}