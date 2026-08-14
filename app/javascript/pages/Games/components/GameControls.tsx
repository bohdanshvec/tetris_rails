import { Link } from '@inertiajs/react'

type GameControlsProps = {
  gameId: number
  gameOver: boolean
}

export default function GameControls({
  gameId,
  gameOver,
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
    </div>
  )
}
