import { Body, Box, Vec3 } from 'cannon-es'
import PositionHelper from './PositionHelper'
import BlockSizeManager from './Block/BlockSizeManager'

export default class PhysicBlock extends Body {
    constructor(positionHelper: PositionHelper, blockSizeManager: BlockSizeManager, mass = 1) {
        super({ mass });
        const shape = this.generateCubeShape(...blockSizeManager.getSize());

        this.addShape(shape);
        this.position.set(...positionHelper.getPosition())
    }

    generateCubeShape(x: number, y: number, z: number): Box {
        return new Box(new Vec3(x, y, z))
    }

}