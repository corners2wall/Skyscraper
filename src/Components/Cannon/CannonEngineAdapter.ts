import { GameBlockAdapter } from "../../Types/common";
import GameBlock from "../GameBlock";
import CannonEngine from "./CannonEngine";

export default class CannonEngineAdapter implements GameBlockAdapter {
    constructor(private engine: CannonEngine) {
        this.addGameBlockToEngine = this.addGameBlockToEngine.bind(this);
    }

    public addGameBlockToEngine(gameBlock: GameBlock) {
        this.engine.addBody(gameBlock.getPhysicBlock());
    }
}