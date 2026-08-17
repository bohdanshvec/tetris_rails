import type { GameControl } from '../../../tetris/useTetrisGame'

type MobileGameControlsProps = {
  onControl: (control: GameControl) => void
}

const controls: {
  control: GameControl
  label: string
  className: string
}[] = [
  {
    control: 'up',
    label: '↑',
    className: 'col-start-2 row-start-1',
  },
  {
    control: 'left',
    label: '←',
    className: 'col-start-1 row-start-2',
  },
  {
    control: 'down',
    label: '↓',
    className: 'col-start-2 row-start-2',
  },
  {
    control: 'right',
    label: '→',
    className: 'col-start-3 row-start-2',
  },
]

export default function MobileGameControls({
  onControl,
}: MobileGameControlsProps) {
  return (
    <div
      className="mt-3 grid w-max self-center grid-cols-3 gap-2 lg:hidden"
      aria-label="Управление игрой"
    >
      {controls.map(({ control, label, className }) => (
        <button
          key={control}
          type="button"
          onClick={() => onControl(control)}
          className={`h-12 w-12 rounded-lg border-2 border-gray-400 bg-gray-100 text-2xl font-bold leading-none shadow-sm active:translate-y-px active:shadow-none ${className}`}
          aria-label={
            {
              left: 'Влево',
              down: 'Вниз',
              right: 'Вправо',
              up: 'Повернуть фигуру',
            }[control]
          }
        >
          {label}
        </button>
      ))}
    </div>
  )
}
