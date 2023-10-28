import { Body, Box, Vec3 } from 'cannon-es'
import PositionHelper from './PositionHelper'
import BlockSizeManager from './Block/BlockSizeManager'
import { BlockSize } from '../Types/common';

export default class PhysicBlock extends Body {
    constructor(positionHelper: PositionHelper, blockSizeManager: BlockSizeManager, mass = 0) {
        super({ mass });
        const blockSize = blockSizeManager.getSizes();
        const shape = this.generateCubeShape(blockSize);

        this.addShape(shape);
        this.position.set(...positionHelper.getPosition())
    }

    generateCubeShape({ width, height, depth }: BlockSize): Box {
        return new Box(new Vec3(width / 2, height / 2, depth / 2))
    }
}