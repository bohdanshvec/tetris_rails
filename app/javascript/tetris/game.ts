import { createFigure } from './figures'
import { hasCollision } from './collision'
import { dropDown } from './move'
import { clearFullRows, getFullRows } from './field'
import type { Figure, ArrDown } from './types'

export type GameState = {
  figure: Figure
  arrDown: ArrDown
  gameOver: boolean
  lines: number
}

export function createGame(): GameState {
  return {
    figure: createFigure(),
    arrDown: [],
    gameOver: false,
    lines: 0,
  }
}

export function stepDown(game: GameState): GameState {
  if (game.gameOver) {
    return game
  }

  const movedFigure = game.figure.map((coord) => ({
    x: coord.x,
    y: coord.y + 1,
  }))

  if (!hasCollision(movedFigure, game.arrDown)) {
    return {
      ...game,
      figure: movedFigure,
    }
  }

  const newArrDown = [...game.arrDown, ...game.figure]

  const fullRows = getFullRows(newArrDown)

  const clearedArrDown = clearFullRows(newArrDown)

  const gameOver = clearedArrDown.some((coord) => coord.y === 0)

  return {
    figure: createFigure(),
    arrDown: clearedArrDown,
    gameOver,
    lines: game.lines + fullRows.length,
  }
}

export function dropFigure(game: GameState): GameState {
  if (game.gameOver) {
    return game
  }

  const droppedFigure = dropDown(game.figure, game.arrDown)

  const newArrDown = [...game.arrDown, ...droppedFigure]

  const fullRows = getFullRows(newArrDown)

  const clearedArrDown = clearFullRows(newArrDown)

  const gameOver = clearedArrDown.some((coord) => coord.y === 0)

  return {
    figure: createFigure(),
    arrDown: clearedArrDown,
    gameOver,
    lines: game.lines + fullRows.length,
  }
}
