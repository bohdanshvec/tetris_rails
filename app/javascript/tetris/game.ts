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
  clearingRows: number[]
}

export function createGame(): GameState {
  return {
    figure: createFigure(),
    arrDown: [],
    gameOver: false,
    lines: 0,
    clearingRows: [],
  }
}

export function stepDown(game: GameState): GameState {
  if (game.gameOver) {
    return game
  }

  // Если сейчас идёт анимация удаления строк,
  // ничего не делаем.
  if (game.clearingRows.length > 0) {
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

  // Если есть заполненные строки,
  // пока НЕ удаляем их.
  if (fullRows.length > 0) {
    return {
      ...game,
      figure: createFigure(),
      arrDown: newArrDown,
      clearingRows: fullRows,
      lines: game.lines + fullRows.length,
    }
  }

  const gameOver = newArrDown.some(
    (coord) => coord.y === 0,
  )

  return {
    ...game,
    figure: createFigure(),
    arrDown: newArrDown,
    gameOver,
  }
}

export function dropFigure(game: GameState): GameState {
  if (game.gameOver) {
    return game
  }

  if (game.clearingRows.length > 0) {
    return game
  }

  const droppedFigure = dropDown(
    game.figure,
    game.arrDown,
  )

  const newArrDown = [
    ...game.arrDown,
    ...droppedFigure,
  ]

  const fullRows = getFullRows(newArrDown)

  // Если есть заполненные строки,
  // ждём окончания анимации.
  if (fullRows.length > 0) {
    return {
      ...game,
      figure: createFigure(),
      arrDown: newArrDown,
      clearingRows: fullRows,
      lines: game.lines + fullRows.length,
    }
  }

  const gameOver = newArrDown.some(
    (coord) => coord.y === 0,
  )

  return {
    ...game,
    figure: createFigure(),
    arrDown: newArrDown,
    gameOver,
  }
}

export function finishClearing(game: GameState): GameState {
  if (game.clearingRows.length === 0) {
    return game
  }

  const clearedArrDown = clearFullRows(game.arrDown)

  const gameOver = clearedArrDown.some(
    (coord) => coord.y === 0,
  )

  return {
    ...game,
    arrDown: clearedArrDown,
    clearingRows: [],
    gameOver,
  }
}
