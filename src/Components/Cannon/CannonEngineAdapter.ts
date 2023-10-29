import { GameBlockAdapter } from "../../Types/common";
import GameBlock from "../Block/Block";
import CannonEngine from "./CannonEngine";

export default class CannonEngineAdapter implements GameBlockAdapter {
    constructor(private engine: CannonEngine) {
        this.addGameBlock = this.addGameBlock.bind(this);
        this.removeGameBlock = this.removeGameBlock.bind(this);
    }

    public addGameBlock(gameBlock: GameBlock) {
        this.engine.addBody(gameBlock.getPhysicBlock());
    }

    public removeGameBlock(gameBlock: GameBlock) {
        this.engine.removeBody(gameBlock.getPhysicBlock());
    }
}
