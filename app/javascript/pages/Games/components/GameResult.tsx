type GameResultProps = {
  lines: number
  duration: number
  speed: string
}

function formatDuration(duration: number): string {
  const minutes = Math.floor(duration / 60)
  const seconds = duration % 60

  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

function formatSpeed(speed: string): string {
  return speed.charAt(0).toUpperCase() + speed.slice(1)
}

export default function GameResult({
  lines,
  duration,
  speed,
}: GameResultProps) {
  return (
    <div className="mt-5">
      <h2 className="font-bold text-lg">RESULT</h2>

      <div className="text-gray-500">
        <div>──────────</div>
        <div>Lines: {lines}</div>
        <div>Duration: {formatDuration(duration)}</div>
        <div>Speed: {formatSpeed(speed)}</div>
      </div>
    </div>
  )
}
