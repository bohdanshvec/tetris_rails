import { Link } from '@inertiajs/react'

export default function Index() {
  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold">Game TETRIS</h1>

      <br />

      <h2 className="text-lg mb-3">Choose speed:</h2>

      <div className="flex gap-3">
        <Link
          href="/games"
          method="post"
          data={{ speed: 'low' }}
          className="inline-block px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow"
        >
          Low Speed
        </Link>

        <Link
          href="/games"
          method="post"
          data={{ speed: 'mid' }}
          className="inline-block px-4 py-2 bg-yellow-500 text-white font-semibold rounded-lg shadow"
        >
          Mid Speed
        </Link>

        <Link
          href="/games"
          method="post"
          data={{ speed: 'high' }}
          className="inline-block px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow"
        >
          High Speed
        </Link>
      </div>
    </div>
  )
}
