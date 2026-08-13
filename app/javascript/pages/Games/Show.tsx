import { useEffect, useState } from 'react'
import { createGame, dropFigure, stepDown } from '../../tetris/game'
import { renderField } from '../../tetris/render'
import { moveLeft, moveRight, rotate } from '../../tetris/move'

type ShowProps = {
  game_id: number
}

export default function Show({ game_id }: ShowProps) {
  const [game, setGame] = useState(() => createGame())

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        setGame((currentGame) => ({
          ...currentGame,
          figure: moveLeft(currentGame.figure, currentGame.arrDown),
        }))
      }

      if (event.key === 'ArrowRight') {
        setGame((currentGame) => ({
          ...currentGame,
          figure: moveRight(currentGame.figure, currentGame.arrDown),
        }))
      }

      if (event.key === 'ArrowDown') {
        setGame((currentGame) => dropFigure(currentGame))
      }

      if (event.key === 'ArrowUp') {
        setGame((currentGame) => ({
          ...currentGame,
          figure: rotate(currentGame.figure, currentGame.arrDown),
        }))
      }
    }

    document.addEventListener('keydown', handleKey)

    return () => {
      document.removeEventListener('keydown', handleKey)
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setGame((currentGame) => stepDown(currentGame))
    }, 300)

    return () => {
      clearInterval(interval)
    }
  }, [])

  const field = renderField(game.figure, game.arrDown)

  return (
    <div className="p-5">
      <h1 className="text-xl font-bold mb-4">Game TETRIS #{game_id}</h1>

      <div className="relative inline-block border-4 border-green-500 bg-green-50 p-1">
        {field.map((row, y) => (
          <div key={y} className="flex">
            {row.map((cell, x) => (
              <div
                key={x}
                className="w-6 h-6 flex items-center justify-center font-mono"
              >
                {cell === 'O' ? (
                  <div className="w-full h-full bg-green-500" />
                ) : (
                  ' '
                )}
              </div>
            ))}
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
    </div>
  )
}
