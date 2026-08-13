import { MIN_X, MAX_X, MIN_Y, MAX_Y } from './config'
import type { Figure, ArrDown, Coordinate } from './types'

export function isInsideField(coord: Coordinate): boolean {
  return (
    coord.x >= MIN_X && coord.x <= MAX_X && coord.y >= MIN_Y && coord.y <= MAX_Y
  )
}

export function intersectsWithDown(
  coord: Coordinate,
  arrDown: ArrDown,
): boolean {
  return arrDown.some((block) => block.x === coord.x && block.y === coord.y)
}

export function hasCollision(figure: Figure, arrDown: ArrDown): boolean {
  return figure.some(
    (coord) => !isInsideField(coord) || intersectsWithDown(coord, arrDown),
  )
}
