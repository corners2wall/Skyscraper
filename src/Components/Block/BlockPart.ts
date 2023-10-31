import Block from "./Block";
import PhysicBlock from "./PhysicBlock";
import UiBlock from "./UiBlock";

// we need 
export default class BlockPart extends Block {
  constructor(
    protected uiBlock: UiBlock,
    protected physicBlock: PhysicBlock) {
    super(uiBlock, physicBlock)
  }
}
