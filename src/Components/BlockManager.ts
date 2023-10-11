import { Mesh } from "three"

export default class BlockManager {
    private blocks: Mesh[];

    constructor(...blocks: Mesh[]) {
        this.blocks = [...blocks];
    }

    addBlock(block: Mesh) {
        this.blocks.push(block);
    }

    getLastBlock(): Mesh {
        return this.blocks[this.blocks.length - 1];
    }

    getAllBlocks(): Mesh[] {
        return this.blocks;
    }
}