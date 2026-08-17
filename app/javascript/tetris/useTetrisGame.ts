import { useEffect, useRef, useState } from 'react'
import { router } from '@inertiajs/react'
import {
  createGame,
  dropFigure,
  stepDown,
  finishClearing,
} from './game'
import {
  moveDown,
  moveLeft,
  moveRight,
  rotate,
} from './move'
import {
  DROP_ANIMATION_INTERVAL,
  CLEAR_ANIMATION_DURATION,
  SPEED_INTERVALS,
} from './config'
import { finishGame } from './api'

export type GameControl =
  | 'left'
  | 'down'
  | 'right'
  | 'up'

export function useTetrisGame(
  gameId: number,
  speed: string,
) {
  const [game, setGame] = useState(() => createGame())
  const [isDropping, setIsDropping] = useState(false)

  const finishSent = useRef(false)

  const gameStartedAt = useRef(Date.now())

  useEffect(() => {
    setGame(createGame())
    setIsDropping(false)

    finishSent.current = false
    gameStartedAt.current = Date.now()
  }, [gameId])

  const handleControl = (control: GameControl) => {
    // Во время удаления строк управление отключено
    if (game.clearingRows.length > 0) {
      return
    }

    // Влево
    if (control === 'left') {
      setGame((currentGame) => {
        if (currentGame.gameOver || isDropping) {
          return currentGame
        }

        return {
          ...currentGame,
          figure: moveLeft(
            currentGame.figure,
            currentGame.arrDown,
          ),
        }
      })

      return
    }

    // Вправо
    if (control === 'right') {
      setGame((currentGame) => {
        if (currentGame.gameOver || isDropping) {
          return currentGame
        }

        return {
          ...currentGame,
          figure: moveRight(
            currentGame.figure,
            currentGame.arrDown,
          ),
        }
      })

      return
    }

    // Поворот
    if (control === 'up') {
      setGame((currentGame) => {
        if (currentGame.gameOver || isDropping) {
          return currentGame
        }

        return {
          ...currentGame,
          figure: rotate(
            currentGame.figure,
            currentGame.arrDown,
          ),
        }
      })

      return
    }

    // Ускоренное падение
    if (control === 'down') {
      if (isDropping || game.gameOver) {
        return
      }

      setIsDropping(true)
    }
  }

  // Управление клавиатурой
  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      // Escape
      if (event.key === 'Escape') {
        if (game.gameOver) {
          router.get('/games')
        } else {
          router.post(`/games/${gameId}/quit`)
        }

        return
      }

      const controls: Record<string, GameControl> = {
        ArrowLeft: 'left',
        ArrowDown: 'down',
        ArrowRight: 'right',
        ArrowUp: 'up',
      }

      const control = controls[event.key]

      if (control) {
        handleControl(control)
      }
    }

    document.addEventListener('keydown', handleKey)

    return () => {
      document.removeEventListener('keydown', handleKey)
    }
  }, [
    gameId,
    isDropping,
    game.gameOver,
    game.clearingRows,
  ])

  // Анимация удаления заполненных строк
  useEffect(() => {
    if (game.clearingRows.length === 0) {
      return
    }

    const timeout = window.setTimeout(() => {
      setGame((currentGame) =>
        finishClearing(currentGame),
      )
    }, CLEAR_ANIMATION_DURATION)

    return () => {
      window.clearTimeout(timeout)
    }
  }, [game.clearingRows])

  // Анимация ускоренного падения
  useEffect(() => {
    if (
      !isDropping ||
      game.gameOver ||
      game.clearingRows.length > 0
    ) {
      return
    }

    const interval = window.setInterval(() => {
      setGame((currentGame) => {
        if (currentGame.gameOver) {
          window.clearInterval(interval)
          setIsDropping(false)

          return currentGame
        }

        if (currentGame.clearingRows.length > 0) {
          window.clearInterval(interval)
          setIsDropping(false)

          return currentGame
        }

        const movedFigure = moveDown(
          currentGame.figure,
          currentGame.arrDown,
        )

        // Фигура смогла опуститься на одну клетку
        if (movedFigure !== currentGame.figure) {
          return {
            ...currentGame,
            figure: movedFigure,
          }
        }

        // Ниже двигаться нельзя.
        // Фиксируем фигуру и создаём новую.
        const newGame = dropFigure(currentGame)

        window.clearInterval(interval)
        setIsDropping(false)

        return newGame
      })
    }, DROP_ANIMATION_INTERVAL)

    return () => {
      window.clearInterval(interval)
    }
  }, [
    isDropping,
    game.gameOver,
    game.clearingRows,
  ])

  // Автоматический игровой тик
  useEffect(() => {
    if (
      game.gameOver ||
      isDropping ||
      game.clearingRows.length > 0
    ) {
      return
    }

    const interval = window.setInterval(
      () => {
        setGame((currentGame) =>
          stepDown(currentGame),
        )
      },
      SPEED_INTERVALS[
        speed as keyof typeof SPEED_INTERVALS
      ],
    )

    return () => {
      window.clearInterval(interval)
    }
  }, [
    speed,
    game.gameOver,
    isDropping,
    game.clearingRows,
  ])

  // Сообщаем Rails, что игра завершилась
  useEffect(() => {
    if (!game.gameOver) {
      return
    }

    if (finishSent.current) {
      return
    }

    finishSent.current = true

    const duration = Math.floor(
      (Date.now() - gameStartedAt.current) / 1000,
    )

    finishGame({
      gameId,
      speed,
      lines: game.lines,
      duration,
    })
  }, [
    game.gameOver,
    gameId,
    speed,
    game.lines,
  ])

  const duration = Math.floor(
    (Date.now() - gameStartedAt.current) / 1000,
  )

  return {
    game,
    duration,
    handleControl,
  }
}
