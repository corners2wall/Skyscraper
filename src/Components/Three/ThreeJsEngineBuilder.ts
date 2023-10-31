import { Camera, Object3D, Scene } from 'three'

import { Builder } from '../../Types/common'
import ThreeJsEngine from './ThreeJsEngine'

export default class ThreeJsEngineBuilder implements Builder<ThreeJsEngine> {
  private threeJsEngine: ThreeJsEngine

  constructor(threeJsEngine: ThreeJsEngine) {
    this.threeJsEngine = threeJsEngine
  }

  public addItem(item: Object3D) {
    this.threeJsEngine.addObjectToScene(item)

    return this
  }

  public setCamera(camera: Camera) {
    this.threeJsEngine.setCamera(camera)

    return this
  }

  public setScene(scene: Scene) {
    this.threeJsEngine.setScene(scene)

    return this
  }

  public build() {
    // ToDo: Add assertion

    return this.threeJsEngine
  }
}
