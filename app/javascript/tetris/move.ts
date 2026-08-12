import { hasCollision } from './collision'
import type { Figure, ArrDown } from './types'

export function moveLeft(figure: Figure, arrDown: ArrDown): Figure {
  const movedFigure = figure.map((coord) => ({
    x: coord.x - 1,
    y: coord.y,
  }))

  if (hasCollision(movedFigure, arrDown)) {
    return figure
  }

  return movedFigure
}

export function moveRight(figure: Figure, arrDown: ArrDown): Figure {
  const movedFigure = figure.map((coord) => ({
    x: coord.x + 1,
    y: coord.y,
  }))

  if (hasCollision(movedFigure, arrDown)) {
    return figure
  }

  return movedFigure
}

export function moveDown(figure: Figure, arrDown: ArrDown): Figure {
  const movedFigure = figure.map((coord) => ({
    x: coord.x,
    y: coord.y + 1,
  }))

  if (hasCollision(movedFigure, arrDown)) {
    return figure
  }

  return movedFigure
}

export function dropDown(figure: Figure, arrDown: ArrDown): Figure {
  let currentFigure = figure

  while (true) {
    const nextFigure = currentFigure.map((coord) => ({
      x: coord.x,
      y: coord.y + 1,
    }))

    if (hasCollision(nextFigure, arrDown)) {
      return currentFigure
    }

    currentFigure = nextFigure
  }
}

export function rotate(figure: Figure, arrDown: ArrDown): Figure {
  const pivot = figure[1]

  // Сохраняем исходный верхний уровень фигуры
  const minY = Math.min(...figure.map((coord) => coord.y))

  // Поворачиваем относительно pivot
  const rotatedFigure = figure.map((coord) => {
    const dx = coord.x - pivot.x
    const dy = coord.y - pivot.y

    return {
      x: pivot.x - dy,
      y: pivot.y + dx,
    }
  })

  // После поворота фигура могла уйти выше поля.
  // Возвращаем её вниз до исходного верхнего уровня.
  const newMinY = Math.min(...rotatedFigure.map((coord) => coord.y))

  const deltaY = minY - newMinY

  const adjustedFigure = rotatedFigure.map((coord) => ({
    x: coord.x,
    y: coord.y + deltaY,
  }))

  // Проверяем уже скорректированную фигуру
  if (hasCollision(adjustedFigure, arrDown)) {
    return figure
  }

  return adjustedFigure
}
