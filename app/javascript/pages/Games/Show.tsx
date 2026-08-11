import { useEffect, useState } from 'react'
import { router } from '@inertiajs/react'

export default function Show({ field, game_id }) {
  const [direction, setDirection] = useState(null)
  const [nextDirection, setNextDirection] = useState(null)
  const [quit, setQuit] = useState(false)

  useEffect(() => {
    if (!game_id) return

    const handleKey = (event) => {
      const dir = {
        ArrowUp: 'up',
        ArrowDown: 'down',
        ArrowLeft: 'left',
        ArrowRight: 'right',
      }[event.key]

      if (dir) setNextDirection(dir)
      if (event.key === 'Escape') setQuit(true)
    }

    document.addEventListener('keydown', handleKey)

    const stepUrl = `/games/${game_id}/step`

    const interval = setInterval(() => {
      if (nextDirection) {
        setDirection(nextDirection)
        setNextDirection(null)
      }

      router.post(
        stepUrl,
        { direction, quit },
        {
          preserveScroll: true,
          preserveState: true,
          only: ['field'],
        }
      )
    }, 300)

    return () => {
      clearInterval(interval)
      document.removeEventListener('keydown', handleKey)
    }
  }, [game_id, direction, nextDirection, quit])

  return (
    <div className="p-5">
      <h1 className="text-xl font-bold mb-4">Game TETRIS #{game_id}</h1>
      <pre
        key={Array.isArray(field) ? field.join('') : String(field)}
        className="inline-block font-mono text-sm bg-gray-900 text-green-400 p-1 rounded-lg leading-none tracking-tight"
      >
        {Array.isArray(field) ? field.join('\n') : ''}
      </pre>
    </div>
  )
}
