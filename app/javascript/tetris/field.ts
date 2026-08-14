import { FIELD_HEIGHT, FIELD_WIDTH } from './config'

import type { ArrDown } from './types'

export function createField(): string[][] {
  const field: string[][] = []

  for (let y = 0; y < FIELD_HEIGHT; y++) {
    const row: string[] = []

    for (let x = 0; x < FIELD_WIDTH; x++) {
      row.push(' ')
    }

    field.push(row)
  }

  return field
}

export function getFullRows(arrDown: ArrDown): number[] {
  const fullRows: number[] = []

  for (let y = 0; y < FIELD_HEIGHT; y++) {
    const blocksInRow = arrDown.filter(
      (coord) => coord.y === y,
    ).length

    if (blocksInRow === FIELD_WIDTH) {
      fullRows.push(y)
    }
  }

  return fullRows
}

export function clearFullRows(arrDown: ArrDown): ArrDown {
  const fullRows = getFullRows(arrDown)

  if (fullRows.length === 0) {
    return arrDown
  }

  const remainingBlocks = arrDown.filter(
    (coord) => !fullRows.includes(coord.y),
  )

  return remainingBlocks.map((coord) => {
    const rowsBelow = fullRows.filter(
      (row) => row > coord.y,
    ).length

    return {
      x: coord.x,
      y: coord.y + rowsBelow,
    }
  })
}
