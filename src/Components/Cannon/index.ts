import { Vec3 } from 'cannon-es'

import CannonEngine from './CannonEngine'
import CannonEngineAdapter from './CannonEngineAdapter'
import CannonEngineBuilder from './CannonEngineBuilder'
import CannonItem from './CannonItem'

const defaultCannonEngine = new CannonEngine({ gravity: new Vec3(0, -9.82, 0) })

const ground = new CannonItem('Plane', {
  mass: 0,
  position: new Vec3(0, -1, 0),
})
ground.quaternion.setFromEuler(-Math.PI / 2, 0, 0)

const cannonEngine = new CannonEngineBuilder(defaultCannonEngine)
  .addItem(ground)
  .build()

export const cannonEngineAdapter = new CannonEngineAdapter(cannonEngine)

export default cannonEngine
