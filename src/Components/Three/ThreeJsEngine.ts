import { Camera, Object3D, Renderer, Scene } from "three";
import { Engine } from "../../Types/common";

export default class ThreeJsEngine implements Engine {
    private renderer: Renderer
    private scene: Scene
    private camera: Camera

    constructor(renderer: Renderer) {
        this.renderer = renderer;
        this.render = this.render.bind(this);
    }

    public render(): void {
        this.renderer.render(this.scene, this.camera)
    }

    public addObjectToScene(item: Object3D) {
        this.scene.add(item);
    }

    public setCamera(camera: Camera) {
        this.camera = camera;
    }

    public setScene(scene: Scene) {
        this.scene = scene
    }
}
