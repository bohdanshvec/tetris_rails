import { createField } from './field'

import type { Figure, ArrDown } from './types'

export function renderField(figure: Figure, arrDown: ArrDown): string[][] {
  const field = createField()

  for (const coord of arrDown) {
    field[coord.y][coord.x] = 'O'
  }

  for (const coord of figure) {
    field[coord.y][coord.x] = 'O'
  }

  return field
}
