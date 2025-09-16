class Game < ApplicationRecord
  FIELD_WIDTH = 12
  FIELD_HEIGHT = 21

  FIELD_WIDTH_GAMING = FIELD_WIDTH - 2
  FIELD_HEIGHT_GAMING = FIELD_HEIGHT - 1

  def figures
    [
      [ { x: 4, y: 0 }, { x: 5, y: 0 }, { x: 6, y: 0 }, { x: 7, y: 0 } ], # I
      [ { x: 5, y: 0 }, { x: 4, y: 1 }, { x: 5, y: 1 }, { x: 6, y: 1 } ], # O
      [ { x: 4, y: 0 }, { x: 5, y: 0 }, { x: 6, y: 0 }, { x: 6, y: 1 } ], # L
      [ { x: 5, y: 0 }, { x: 6, y: 0 }, { x: 7, y: 0 }, { x: 5, y: 1 } ], # T
      [ { x: 4, y: 0 }, { x: 5, y: 0 }, { x: 6, y: 0 }, { x: 5, y: 1 } ], # T2
      [ { x: 5, y: 0 }, { x: 6, y: 0 }, { x: 4, y: 1 }, { x: 5, y: 1 } ], # S
      [ { x: 4, y: 0 }, { x: 5, y: 0 }, { x: 5, y: 1 }, { x: 6, y: 1 } ], # Z
    ]
  end

  def field
    arr = []
    FIELD_HEIGHT_GAMING.times { arr << ("|" + " " * FIELD_WIDTH_GAMING + "|") }
    arr << ("-" * FIELD_WIDTH)
    arr
  end

  def spawn_figure
    figures.sample
  end

  def move_down(figure, arr_down)
    # пробуем сдвинуть фигуру вниз
    moved = figure.map { |coord| { x: coord[:x], y: coord[:y] + 1 } }

    # проверяем, не упёрлась ли фигура
    if collision?(moved, arr_down)
      # застывшая фигура → добавляем в arr_down
      arr_down.concat(figure)
      return [spawn_figure, arr_down]
    else
      # иначе просто двигаем вниз
      return [moved, arr_down]
    end
  end

  def collision?(figure, arr_down)
    figure.any? do |coord|
      coord[:y] >= FIELD_HEIGHT_GAMING || arr_down.any? { |d| d[:x] == coord[:x] && d[:y] == coord[:y] }
    end
  end

  def render_field(figure, arr_down)
    field = self.field

    (arr_down + figure).each do |coord|
      x = coord[:x]
      y = coord[:y]
      field[y][x] = "O"
    end

    field
  end
end
