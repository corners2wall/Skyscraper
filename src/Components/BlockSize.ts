export default class BlockSize {
    private static instance: BlockSize;

    constructor() {
        // if (!BlockSize.instance) this.create();

        // return BlockSize.instance
    }

    create() {
        return new BlockSize();
    }
}
