import 'reflect-metadata'

import { Container } from 'inversify'

import BlockGenerator from '../Components/Block/BlockGenerator'
import BlockPosition from '../Components/Block/BlockPosition'
import BlockSize from '../Components/Block/BlockSize'
import BlockStack from '../Components/Block/BlockStack'
import OffsetBlockCommand from '../Components/BlockGenerator/OffsetBlockCommand'
import SliceBlockCommand from '../Components/BlockGenerator/SliceBlockCommand'
import StableBlockCommand from '../Components/BlockGenerator/StableBlockCommand'
import cannonEngine from '../Components/Cannon'
import EngineManager from '../Components/EngineManager'
import Game from '../Components/Game'
import Stats from '../Components/Stats'
import threeJsEngine from '../Components/Three'
import { BLOCK_POSITION, BLOCK_SIZE } from '../Const/Common'
import {
  BlockCommand,
  Engine,
  PositionHelper,
  SizeHelper,
} from '../Types/interfaces'
import EventEmitter from '../Utils/EventEmitter'
import TYPES from './types'

const container = new Container()

container
  .bind<PositionHelper>(TYPES.PositionHelper)
  .toConstantValue(
    new BlockPosition(BLOCK_POSITION.x, BLOCK_POSITION.y, BLOCK_POSITION.z),
  )

container
  .bind<SizeHelper>(TYPES.SizeHelper)
  .toConstantValue(
    new BlockSize(BLOCK_SIZE.width, BLOCK_SIZE.height, BLOCK_SIZE.depth),
  )

container.bind<Engine>(TYPES.Engine).toConstantValue(threeJsEngine)

container.bind<Engine>(TYPES.Engine).toConstantValue(cannonEngine)

container.bind<EngineManager>(TYPES.EngineManager).to(EngineManager)

container
  .bind<EventEmitter>(TYPES.EventEmitter)
  .to(EventEmitter)
  .inSingletonScope()

container
  .bind<BlockCommand>(TYPES.BlockCommand)
  .to(SliceBlockCommand)
  .whenTargetNamed('sliceCommand')

container
  .bind<BlockCommand>(TYPES.BlockCommand)
  .to(StableBlockCommand)
  .whenTargetNamed('stableCommand')

container
  .bind<BlockCommand>(TYPES.BlockCommand)
  .to(OffsetBlockCommand)
  .whenTargetNamed('offsetCommand')

container.bind<Stats>(TYPES.Stats).to(Stats)
container.bind<BlockGenerator>(TYPES.BlockGenerator).to(BlockGenerator)
container.bind<Game>(TYPES.Game).to(Game)
container.bind<BlockStack>(TYPES.BlockStack).to(BlockStack)

export default container
