import { useTetrisGame } from '../../tetris/useTetrisGame'
import GameField from './components/GameField'
import GameControls from './components/GameControls'
import GameResult from './components/GameResult'

type ShowProps = {
  game_id: number
  speed: string
}

export default function Show({
  game_id,
  speed,
}: ShowProps) {
  const { game, duration } = useTetrisGame(
    game_id,
    speed,
  )

  return (
    <div className="p-5">
      <h1 className="text-xl font-bold mb-4">
        Speed:{' '}
        <span className="text-gray-500">
          {speed}
        </span>

        <span className="ml-8">
          Lines:{' '}
          <span className="text-gray-500">
            {game.lines}
          </span>
        </span>
      </h1>

      <div className="flex items-start gap-5">
        {/* Игровое поле */}
        <GameField game={game} />

        {/* Управление и результат */}
        <div className="flex flex-col">
          <GameControls
            gameId={game_id}
            gameOver={game.gameOver}
          />

          {game.gameOver && (
            <GameResult
              lines={game.lines}
              duration={duration}
              speed={speed}
            />
          )}
        </div>
      </div>
    </div>
  )
}
