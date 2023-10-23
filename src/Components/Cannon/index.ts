import CannonEngine from "./CannonEngine";
import CannonEngineBuilder from "./CannonEngineBuilder";
import CannonItem from "./CannonItem";

const defaultCannonEngine = new CannonEngine();

const ground = new CannonItem('Plane');

const cannonEngine = new CannonEngineBuilder(defaultCannonEngine)
    .addItem(ground)
    .build();

export default cannonEngine;