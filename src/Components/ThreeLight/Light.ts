import { Color, Light as ThreeLight } from "three";
import { Positions } from "../../Types/common";
import LightFactory, { LightType } from "./LightFactory";

interface LightOptions {
    lightType: LightType;
    position: Positions;
    color: Color;
}

export default class Light {
    private light: ThreeLight

    constructor({ lightType, position, color }: LightOptions) {
        this.light = LightFactory.create(lightType)

        this.setLightColor(color);
        this.setPosition(position);
    }

    public setPosition(position: Positions) {
        this.light.position.set(...position)
    }

    public setLightColor(color: Color) {
        this.light.color.set(color);
    }
}