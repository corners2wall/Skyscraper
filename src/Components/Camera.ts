import { PerspectiveCamera, Vector3 } from "three";
import { CAMERA_POSITION } from "../Const/Common";

export default class Camera extends PerspectiveCamera {
    private lookAtPosition = new Vector3(1, -1, 0)

    constructor() {
        super(75, window.innerWidth / window.innerHeight)

        this.position.set(CAMERA_POSITION.x, CAMERA_POSITION.y, CAMERA_POSITION.z);
        this.lookAt(this.lookAtPosition);
        this.updateCameraPosition = this.updateCameraPosition.bind(this);
    }

    public updateCameraPosition() {
        this.changeLookAtPosition();
        this.lookAt(this.lookAtPosition);
        this.position.setY(this.position.y + 1)
    }

    private changeLookAtPosition() {
        this.lookAtPosition.setY(this.lookAtPosition.y + 1);
    }
}