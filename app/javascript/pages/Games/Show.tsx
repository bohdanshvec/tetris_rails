import { useEffect, useRef, useState } from 'react'
import { Link, router } from '@inertiajs/react'
import { createGame, dropFigure, stepDown } from '../../tetris/game'
import { renderField } from '../../tetris/render'
import { moveLeft, moveRight, rotate } from '../../tetris/move'

const SPEED_INTERVALS = {
  low: 1000,
  mid: 600,
  high: 300,
}

type ShowProps = {
  game_id: number
  speed: string
}

  export default function Show({ game_id, speed }: ShowProps) {
    const [game, setGame] = useState(() => createGame())
    const finishSent = useRef(false)

    useEffect(() => {
      setGame(createGame())
      finishSent.current = false
    }, [game_id])

    console.log('SHOW:', game_id, game.gameOver)

  // Управление клавиатурой
  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      // Выход из игры через Escape
      if (event.key === 'Escape') {
        router.post(`/games/${game_id}/quit`)
        return
      }

      if (event.key === 'ArrowLeft') {
        setGame((currentGame) => {
          if (currentGame.gameOver) {
            return currentGame
          }

          return {
            ...currentGame,
            figure: moveLeft(currentGame.figure, currentGame.arrDown),
          }
        })
      }

      if (event.key === 'ArrowRight') {
        setGame((currentGame) => {
          if (currentGame.gameOver) {
            return currentGame
          }

          return {
            ...currentGame,
            figure: moveRight(currentGame.figure, currentGame.arrDown),
          }
        })
      }

      if (event.key === 'ArrowDown') {
        setGame((currentGame) => {
          if (currentGame.gameOver) {
            return currentGame
          }

          return dropFigure(currentGame)
        })
      }

      if (event.key === 'ArrowUp') {
        setGame((currentGame) => {
          if (currentGame.gameOver) {
            return currentGame
          }

          return {
            ...currentGame,
            figure: rotate(currentGame.figure, currentGame.arrDown),
          }
        })
      }
    }

    document.addEventListener('keydown', handleKey)

    return () => {
      document.removeEventListener('keydown', handleKey)
    }
  }, [game_id])

  // Автоматический игровой тик
  useEffect(() => {
    if (game.gameOver) {
      return
    }

    const interval = setInterval(
      () => {
        setGame((currentGame) => stepDown(currentGame))
      },
      SPEED_INTERVALS[speed as keyof typeof SPEED_INTERVALS],
    )

    return () => {
      clearInterval(interval)
    }
  }, [speed, game.gameOver])

  // Сообщаем Rails, что игра завершилась
  useEffect(() => {
    if (!game.gameOver) {
      return
    }

    if (finishSent.current) {
      return
    }

    finishSent.current = true

    fetch(`/games/${game_id}/finish`, {
      method: 'POST',
      headers: {
        'X-CSRF-Token':
          document
            .querySelector('meta[name="csrf-token"]')
            ?.getAttribute('content') || '',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        speed: speed,
      }),
    })
  }, [game.gameOver, game_id, speed])

  const field = renderField(game.figure, game.arrDown)

  return (
    <div className="p-5">
      <h1 className="text-xl font-bold mb-4">Game TETRIS #{game_id}</h1>

      <p className="mb-4">Speed: {speed}</p>

      <div className="flex items-start gap-5">
        {/* Игровое поле */}
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

        {/* Кнопки справа */}
        <div className="flex flex-col gap-3">
          {game.gameOver && (
            <>
              <Link
                href="/games"
                method="post"
                data={{ speed: 'low' }}
                className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow text-center"
              >
                Low Speed
              </Link>

              <Link
                href="/games"
                method="post"
                data={{ speed: 'mid' }}
                className="px-4 py-2 bg-yellow-500 text-white font-semibold rounded-lg shadow text-center"
              >
                Mid Speed
              </Link>

              <Link
                href="/games"
                method="post"
                data={{ speed: 'high' }}
                className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow text-center"
              >
                High Speed
              </Link>
            </>
          )}

          <Link
            href={`/games/${game_id}/quit`}
            method="post"
            className="px-4 py-2 bg-gray-500 text-white font-semibold rounded-lg shadow text-center"
          >
            Exit
          </Link>
        </div>
      </div>
    </div>
  )
}
