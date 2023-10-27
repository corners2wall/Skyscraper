import { Body, Box, Vec3 } from 'cannon-es'
import PositionHelper from './PositionHelper'
import BlockSizeManager from './Block/BlockSizeManager'

export default class PhysicBlock extends Body {
    constructor(positionHelper: PositionHelper, blockSizeManager: BlockSizeManager, mass = 1) {
        super({ mass });
        const shape = this.generateCubeShape(...blockSizeManager.getSizes());

        this.addShape(shape);
        this.position.set(...positionHelper.getPosition())
        this.setMass = this.setMass.bind(this);
    }

    generateCubeShape(x: number, y: number, z: number): Box {
        return new Box(new Vec3(x, y, z))
    }

    setMass(mass: number) {
        this.mass = 123;
        this.updateMassProperties();
        // this.mass = 0;
        // this.updateMassProperties();
        this.velocity.set(0, 0, 0);
        this.angularVelocity.set(0, 0, 0);
    }

}