import { Body, Box, Vec3 } from 'cannon-es'
import PositionHelper from './PositionHelper'
import BlockSizeManager from './BlockSizeManager'

export default class PhysicBlock extends Body {
    constructor(positionHelper: PositionHelper, sizeManager: BlockSizeManager, mass = 100) {
        super({ mass });
        const shape = this.generateCubeShape(...sizeManager.getSize());

        this.addShape(shape);
        this.position.set(...positionHelper.getPosition())
    }

    generateCubeShape(x: number, y: number, z: number): Box {
        return new Box(new Vec3(x, y, z))
    }

}