module Tetris
  class Move
    include Tetris::Config

    def self.move_down(figure, arr_down)
      # пробуем сдвинуть фигуру вниз
      moved = figure.map { |coord| { x: coord[:x], y: coord[:y] + 1 } }

      # проверяем, не упёрлась ли фигура
      if self.collision?(moved, arr_down)
        # застывшая фигура → добавляем в arr_down
        arr_down.concat(figure)
        return [Tetris::Figure.add_figure, arr_down]
      else
        # иначе просто двигаем вниз
        return [moved, arr_down]
      end
    end

    def self.collision?(figure, arr_down)
      figure.any? do |coord|
        coord[:y] >= FIELD_HEIGHT_GAMING || arr_down.any? { |d| d[:x] == coord[:x] && d[:y] == coord[:y] }
      end
    end
  end
end