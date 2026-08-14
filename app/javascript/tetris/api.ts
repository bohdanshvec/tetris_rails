type FinishGameParams = {
  gameId: number
  speed: string
  lines: number
  duration: number
}

export async function finishGame({
  gameId,
  speed,
  lines,
  duration,
}: FinishGameParams): Promise<void> {
  await fetch(`/games/${gameId}/finish`, {
    method: 'POST',
    headers: {
      'X-CSRF-Token':
        document
          .querySelector('meta[name="csrf-token"]')
          ?.getAttribute('content') || '',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      speed,
      lines,
      duration,
    }),
  })
}
