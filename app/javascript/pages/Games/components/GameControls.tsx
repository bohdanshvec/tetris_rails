import { Link } from '@inertiajs/react'

type GameControlsProps = {
  gameId: number
  gameOver: boolean
  isPaused: boolean
  onTogglePause: () => void
}

export default function GameControls({
  gameId,
  gameOver,
  isPaused,
  onTogglePause,
}: GameControlsProps) {
  return (
    <div className="flex flex-col gap-3">
      {gameOver && (
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

      {gameOver ? (
        <Link
          href="/games"
          className="px-4 py-2 bg-gray-500 text-white font-semibold rounded-lg shadow text-center"
        >
          Exit
        </Link>
      ) : (
        <Link
          href={`/games/${gameId}/quit`}
          method="post"
          className="px-4 py-2 bg-gray-500 text-white font-semibold rounded-lg shadow text-center"
        >
          Exit
        </Link>
      )}

      {!gameOver && (
        <>
          <button
            type="button"
            onClick={onTogglePause}
            className="px-4 py-2 bg-yellow-500 text-white font-semibold rounded-lg shadow text-center"
          >
            Pause
          </button>

          {isPaused && (
            <p className="-mt-2 text-center text-red-500">
              Game stopped
            </p>
          )}
        </>
      )}
    </div>
  )
}
