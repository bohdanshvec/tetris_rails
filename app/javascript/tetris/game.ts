import { createFigure } from './figures'
import { hasCollision } from './collision'
import { dropDown } from './move'
import { clearFullRows } from './field'
import type { Figure, ArrDown } from './types'

export type GameState = {
  figure: Figure
  arrDown: ArrDown
}

export function createGame(): GameState {
  return {
    figure: createFigure(),
    arrDown: [],
  }
}

export function stepDown(game: GameState): GameState {
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

  return {
    figure: createFigure(),
    arrDown: clearFullRows(newArrDown),
  }
}

export function dropFigure(game: GameState): GameState {
  const droppedFigure = dropDown(game.figure, game.arrDown)

  const newArrDown = [...game.arrDown, ...droppedFigure]

  return {
    figure: createFigure(),
    arrDown: clearFullRows(newArrDown),
  }
}
