import { GameBlockAdapter } from "../../Types/common";
import GameBlock from "../GameBlock";
import ThreeJsEngine from "./ThreeJsEngine";

export default class ThreeJsEngineAdapter implements GameBlockAdapter {
    constructor(private engine: ThreeJsEngine) {
        this.addGameBlockToEngine = this.addGameBlockToEngine.bind(this);
    }

    public addGameBlockToEngine(gameBlock: GameBlock) {
        this.engine.addObjectToScene(gameBlock.getBlock());
    }

}