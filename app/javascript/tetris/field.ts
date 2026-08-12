import { FIELD_HEIGHT_GAMING, FIELD_WIDTH } from './config'
import type { ArrDown } from './types'

export function createField(): string[][] {
  const field: string[][] = []

  for (let y = 0; y < FIELD_HEIGHT_GAMING; y++) {
    const row: string[] = []

    for (let x = 0; x < FIELD_WIDTH; x++) {
      if (x === 0 || x === FIELD_WIDTH - 1) {
        row.push('|')
      } else {
        row.push(' ')
      }
    }

    field.push(row)
  }

  return field
}

export function clearFullRows(arrDown: ArrDown): ArrDown {
  const fullRows: number[] = []

  for (let y = 0; y < FIELD_HEIGHT_GAMING; y++) {
    const blocksInRow = arrDown.filter((coord) => coord.y === y).length

    if (blocksInRow === FIELD_WIDTH - 2) {
      fullRows.push(y)
    }
  }

  if (fullRows.length === 0) {
    return arrDown
  }

  const remainingBlocks = arrDown.filter((coord) => !fullRows.includes(coord.y))

  return remainingBlocks.map((coord) => {
    const rowsBelow = fullRows.filter((row) => row > coord.y).length

    return {
      x: coord.x,
      y: coord.y + rowsBelow,
    }
  })
}
