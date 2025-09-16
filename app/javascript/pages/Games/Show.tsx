import { useEffect } from 'react'
import { router } from '@inertiajs/react'

export default function Show({ game, field }) {
  useEffect(() => {
    const interval = setInterval(() => {
      router.reload({
        only: ['field'], // перезапрашиваем только поле, без перерендеринга всего
        preserveScroll: true,
        preserveState: true,
      })
    }, 300) // 0.3 секунды

    return () => clearInterval(interval) // очистка интервала при выходе
  }, [])

  return (
    <div className="p-5">
      <h1 className="text-xl font-bold mb-4">Game TETRIS #{game.id}</h1>
      <pre
        key={field.join('')}
        className="inline-block font-mono text-sm bg-gray-900 text-green-400 p-1 rounded-lg leading-none tracking-tight"
      >
        {field.join('\n')}
      </pre>
    </div>
  )
}
