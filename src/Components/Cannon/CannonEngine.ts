import { Body, World } from "cannon-es";
import { Engine, WorldOptions } from "../../Types/common";

export default class CannonEngine implements Engine {
    private world: World;

    constructor(options?: WorldOptions) {
        this.world = new World(options);
        this.addBody = this.addBody.bind(this);
    }

    public render() {
        this.world.fixedStep();
    }

    public addBody(body: Body) {
        this.world.addBody(body);
    }
}