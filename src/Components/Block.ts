import {MeshPhongMaterial, Mesh, Color} from "three";

import BlockSize from './BlockSize';

export class Block extends Mesh {
    
    constructor(x: number, y: number, z: number) {
        super();
        // const color = new Color(`hsl(${30 + y * 4}, 100%, 50%)`);

        this.material = new MeshPhongMaterial();
        this.geometry = new BoxGeometry(width, height, depth);
        this.position.set(x, y, z);
    }

    setColor(color: Color) {
        this.material.color = color;
    }
}