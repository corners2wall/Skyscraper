import './style.css'

import BlockGenerator from './Components/Block/BlockGenerator'
import BlockStack from './Components/Block/BlockStack'
import { cannonEngineAdapter } from './Components/Cannon'
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
import {
  PositionHelper,
  BlockCommand,
  Emitter,
  SizeHelper,
  AnimateManager,
} from './Types/interfaces'

/**
 * Setup instances
 */

const blockPosition = container.get<PositionHelper>(TYPES.PositionHelper)
const blockSize = container.get<SizeHelper>(TYPES.SizeHelper)
const eventEmitter = container.get<Emitter>(TYPES.EventEmitter)
const offsetBlockCommand = container.get<BlockCommand>(TYPES.OffsetBlockCommand)
const stableBlockCommand = container.get<BlockCommand>(TYPES.StableBlockCommand)
const sliceBlockCommand = container.get<BlockCommand>(TYPES.SliceBlockCommand)
const engineManager = container.get<AnimateManager>(TYPES.EngineManager)
const blockGenerator = container.get<BlockGenerator>(TYPES.BlockGenerator)
const game = container.get<Game>(TYPES.Game)

// const engineManager = new EngineManager(threeEngine, cannonEngine)
// const stats = new Stats()

const blocksStack = new BlockStack()

// ToDo: PASS FUNCTION TO METHOD FOR CALCULATE POSITION AND SIZE
// ToDo: MAYBE ADD TWO POSITION HELPER FIRST - FOR BLOCK, SECOND FOR SLICE BLOCK

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

window.addEventListener('DOMContentLoaded', () => {
  eventEmitter.emit(CREATE_BLOCK)
  eventEmitter.emit(PRERENDER)
})

window.addEventListener('click', () => {
  const isGameStarted = game.getIsGameStarted()
  const axis = game.getAxis()

  if (isGameStarted) {
    const [stableBlock, activeBlock] = blocksStack.getLastBlocks(2)

    eventEmitter.emit(DELETE_BLOCK, activeBlock)

    sliceBlockCommand.execute(
      axis,
      stableBlock.getUiBlock(),
      activeBlock.getUiBlock(),
    )
    eventEmitter.emit(CREATE_BLOCK_PART)

    stableBlockCommand.execute(
      axis,
      stableBlock.getUiBlock(),
      activeBlock.getUiBlock(),
    )
    eventEmitter.emit(CREATE_BLOCK)
  }

  eventEmitter.emit(CHANGE_AXIS)

  offsetBlockCommand.execute(game.getAxis())
  eventEmitter.emit(CREATE_BLOCK)
  eventEmitter.emit(CHANGE_CAMERA_POSITION)

  if (!isGameStarted) eventEmitter.emit(START_GAME, true)
})
