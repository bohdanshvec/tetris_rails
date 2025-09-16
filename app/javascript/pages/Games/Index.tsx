import { Link } from '@inertiajs/react'

export default function InertiaExample() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Game TETRIS</h1>
      <br />

      <Link
        href="/games"
        method="post"
        className="inline-block px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
      >
        New game
      </Link>
    </div>
  )
}
