import type { GameState } from '../../../tetris/game'
import { renderField } from '../../../tetris/render'

type GameFieldProps = {
  game: GameState
}

export default function GameField({ game }: GameFieldProps) {
  const field = renderField(game.figure, game.arrDown)

  return (
    <div className="relative inline-block border-4 border-green-500 bg-green-50 p-1">
      {field.map((row, y) => (
        <div key={y} className="flex">
          {row.map((cell, x) => {
            const isClearingRow =
              game.clearingRows.includes(y)

            return (
              <div
                key={x}
                className="w-6 h-6 flex items-center justify-center font-mono"
              >
                {cell === 'O' ? (
                  <div
                    className={`
                      w-full
                      h-full
                      bg-green-500
                      ${
                        isClearingRow
                          ? 'animate-pulse bg-red-500'
                          : ''
                      }
                    `}
                  />
                ) : (
                  ' '
                )}
              </div>
            )
          })}
        </div>
      ))}

      {game.gameOver && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white px-6 py-4 rounded-lg text-xl font-bold text-red-600">
            GAME OVER
          </div>
        </div>
      )}
    </div>
  )
}
