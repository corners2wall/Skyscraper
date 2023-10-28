import { Body, Box, Vec3 } from 'cannon-es'
import PositionHelper from './PositionHelper'
import BlockSizeManager from './Block/BlockSizeManager'
import { BlockSize } from '../Types/common';

export default class PhysicBlock extends Body {
    constructor(positionHelper: PositionHelper, blockSizeManager: BlockSizeManager, mass = 0) {
        super({ mass });
        const blockSize = blockSizeManager.getSizes();
        // debugger;
        const shape = this.generateCubeShape(blockSize);

        this.addShape(shape);
        this.position.set(...positionHelper.getPosition())
        this.setMass = this.setMass.bind(this);
    }

    generateCubeShape({ width, height, depth }: BlockSize): Box {
        return new Box(new Vec3(width / 2, height / 2, depth / 2))
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