import { Body, Box, Vec3 } from 'cannon-es'
import PositionHelper from '../PositionHelper'
import BlockSizeManager from './BlockSizeManager'
import { BlockSize, ObjectPosition } from '../../Types/common';

export default class PhysicBlock extends Body {
    constructor(
        positionHelper: PositionHelper, 
        blockSizeManager: BlockSizeManager, 
        mass = 0
    ) {
        super({ mass });
        const sizes = blockSizeManager.getSizes();
        const shape = this.generateCubeShape(sizes);

        this.addShape(shape);
        this.setPosition(positionHelper.getPosition());
    }

    private generateCubeShape({ width, height, depth }: BlockSize): Box {
        return new Box(new Vec3(width / 2, height / 2, depth / 2))
    }

    private setPosition({x, y, z}: ObjectPosition) {
        this.position.set(x, y, z)
    }
}
