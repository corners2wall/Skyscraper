import './style.css'

import { fromEvent } from 'rxjs'

import BlockGenerator from './Components/Block/BlockGenerator'
import BlockStack from './Components/Block/BlockStack'
import { cannonEngineAdapter } from './Components/Cannon'
import EngineManager from './Components/EngineManager'
import Game from './Components/Game'
import { camera, threeEngineAdapter } from './Components/Three'
import {
  CREATE_BLOCK,
  ANIMATE_ACTIVE_BLOCK,
  SYNC_BLOCK_WITH_ENGINE,
  CHANGE_AXIS,
  PRERENDER,
  CHANGE_POSITION,
  SYNC_POSITION,
  START_GAME,
  CHANGE_BLOCK_SIZE,
  DELETE_BLOCK,
  CHANGE_CAMERA_POSITION,
  CREATE_BLOCK_PART,
  ADD_BLOCK_IN_STACK,
} from './Const/actions'
import container from './Inversify/container'
import TYPES from './Inversify/types'
import { PositionHelper, BlockCommand, SizeHelper } from './Types/interfaces'
import EventEmitter from './Utils/EventEmitter'

/**
 * Setup instances
 */
const blockPosition = container.get<PositionHelper>(TYPES.PositionHelper)
const blockSize = container.get<SizeHelper>(TYPES.SizeHelper)
const eventEmitter = container.get<EventEmitter>(TYPES.EventEmitter)
const offsetBlockCommand = container.getNamed<BlockCommand>(
  TYPES.BlockCommand,
  'offsetCommand',
)
const stableBlockCommand = container.getNamed<BlockCommand>(
  TYPES.BlockCommand,
  'stableCommand',
)
const sliceBlockCommand = container.getNamed<BlockCommand>(
  TYPES.BlockCommand,
  'sliceCommand',
)
const engineManager = container.get<EngineManager>(TYPES.EngineManager)
const blockGenerator = container.get<BlockGenerator>(TYPES.BlockGenerator)
const game = container.get<Game>(TYPES.Game)
const blocksStack = container.get<BlockStack>(TYPES.BlockStack)

/**
 * Callbacks on events
 */
eventEmitter.addListener(START_GAME, game.setIsGameStarted)
eventEmitter.addListener(START_GAME, game.runAnimateLoop)
eventEmitter.addListener(CREATE_BLOCK, blockGenerator.generateBlock)
eventEmitter.addListener(CREATE_BLOCK_PART, blockGenerator.generateBlockPart)
eventEmitter.addListener(PRERENDER, engineManager.animate)
eventEmitter.addListener(
  SYNC_BLOCK_WITH_ENGINE,
  threeEngineAdapter.addGameBlock,
)
eventEmitter.addListener(
  SYNC_BLOCK_WITH_ENGINE,
  cannonEngineAdapter.addGameBlock,
)
eventEmitter.addListener(CHANGE_AXIS, game.toggleAxes)
eventEmitter.addListener(
  ANIMATE_ACTIVE_BLOCK,
  blocksStack.changePositionInLastBlock,
)
eventEmitter.addListener(CHANGE_POSITION, blockPosition.setPosition)
eventEmitter.addListener(CHANGE_BLOCK_SIZE, blockSize.setSize)
eventEmitter.addListener(SYNC_POSITION, blocksStack.syncBlockPosition)
eventEmitter.addListener(DELETE_BLOCK, threeEngineAdapter.removeGameBlock)
eventEmitter.addListener(DELETE_BLOCK, cannonEngineAdapter.removeGameBlock)
eventEmitter.addListener(DELETE_BLOCK, blocksStack.removeBlock)
eventEmitter.addListener(CHANGE_CAMERA_POSITION, camera.updateCameraPosition)
eventEmitter.addListener(ADD_BLOCK_IN_STACK, blocksStack.addBlock)

fromEvent(window, 'DOMContentLoaded').subscribe(() => {
  eventEmitter.emit(CREATE_BLOCK)
  eventEmitter.emit(PRERENDER)
})

fromEvent(window, 'click').subscribe(() => {
  const isGameStarted = game.getIsGameStarted()
  const axis = game.getAxis()

  if (isGameStarted) {
    const [stableBlock, activeBlock] = blocksStack.getLastBlocks(2)
    const stableUiBlock = stableBlock.getUiBlock()
    const activeUiBlock = activeBlock.getUiBlock()

    eventEmitter.emit(DELETE_BLOCK, activeBlock)

    sliceBlockCommand.execute(axis, stableUiBlock, activeUiBlock)
    eventEmitter.emit(CREATE_BLOCK_PART)

    stableBlockCommand.execute(axis, stableUiBlock, activeUiBlock)
    eventEmitter.emit(CREATE_BLOCK)
  }

  eventEmitter.emit(CHANGE_AXIS)

  offsetBlockCommand.execute(game.getAxis())
  eventEmitter.emit(CREATE_BLOCK)
  eventEmitter.emit(CHANGE_CAMERA_POSITION)

  if (!isGameStarted) eventEmitter.emit(START_GAME, true)
})
