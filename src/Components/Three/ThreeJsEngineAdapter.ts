import { GameBlockAdapter } from "../../Types/common";
import GameBlock from "../GameBlock";
import ThreeJsEngine from "./ThreeJsEngine";

export default class ThreeJsEngineAdapter implements GameBlockAdapter {
    constructor(private engine: ThreeJsEngine) {
        this.addGameBlock = this.addGameBlock.bind(this);
        this.removeGameBlock = this.removeGameBlock.bind(this);
    }

    public addGameBlock(gameBlock: GameBlock) {
        this.engine.addObjectToScene(gameBlock.getBlock());
    }

    public removeGameBlock(gameBlock: GameBlock) {
        this.engine.removeObjectFromScene(gameBlock.getBlock())
    }

}