import { AmbientLight, DirectionalLight, Light } from 'three'

export type LightType = 'directional' | 'ambient'

export default class LightFactory {
  static create(type: LightType): Light {
    if (type == 'ambient') return new AmbientLight()
    if (type == 'directional') return new DirectionalLight()

    throw new Error(`Unknown light type: ${type}`)
  }
}
