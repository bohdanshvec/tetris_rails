import type { Figure } from './types'

export const figures: Figure[] = [
  [
    { x: 4, y: 0 },
    { x: 5, y: 0 },
    { x: 6, y: 0 },
    { x: 7, y: 0 },
  ], // I

  [
    { x: 5, y: 0 },
    { x: 4, y: 1 },
    { x: 5, y: 1 },
    { x: 6, y: 1 },
  ], // O

  [
    { x: 4, y: 0 },
    { x: 5, y: 0 },
    { x: 6, y: 0 },
    { x: 6, y: 1 },
  ], // L

  [
    { x: 5, y: 0 },
    { x: 6, y: 0 },
    { x: 7, y: 0 },
    { x: 5, y: 1 },
  ], // T

  [
    { x: 4, y: 0 },
    { x: 5, y: 0 },
    { x: 6, y: 0 },
    { x: 5, y: 1 },
  ], // T2

  [
    { x: 5, y: 0 },
    { x: 6, y: 0 },
    { x: 4, y: 1 },
    { x: 5, y: 1 },
  ], // S

  [
    { x: 4, y: 0 },
    { x: 5, y: 0 },
    { x: 5, y: 1 },
    { x: 6, y: 1 },
  ], // Z
]

export function createFigure(): Figure {
  const index = Math.floor(Math.random() * figures.length)

  return figures[index].map((coord) => ({
    x: coord.x,
    y: coord.y,
  }))
}
