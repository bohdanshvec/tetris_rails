import { useEffect } from 'react'
import { router } from '@inertiajs/react'

export default function Show({ game, field }) {
  useEffect(() => {
    if (!game || !game.id) return

    const stepUrl = `/games/${game.id}/step`

    const interval = setInterval(() => {
      router.post(
        stepUrl,
        {},
        {
          preserveScroll: true,
          preserveState: true,
          only: ['field'],
        }
      )
    }, 300)

    return () => clearInterval(interval)
  }, [game?.id])

  return (
    <div className="p-5">
      <h1 className="text-xl font-bold mb-4">Game TETRIS #{game.id}</h1>
      <pre
        key={Array.isArray(field) ? field.join('') : String(field)}
        className="inline-block font-mono text-sm bg-gray-900 text-green-400 p-1 rounded-lg leading-none tracking-tight"
      >
        {Array.isArray(field) ? field.join('\n') : ''}
      </pre>
    </div>
  )
}
