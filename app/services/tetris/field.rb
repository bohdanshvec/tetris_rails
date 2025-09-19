module Tetris
  class Field
    include Tetris::Config
    def self.field
      arr = []
      FIELD_HEIGHT_GAMING.times { arr << ("|" + " " * FIELD_WIDTH_GAMING + "|") }
      arr << ("-" * FIELD_WIDTH)
      arr
    end

    def self.render_field(figure, arr_down)
      field = self.field

      (arr_down + figure).each do |coord|
        x = coord[:x]
        y = coord[:y]
        field[y][x] = "O"
      end

      field
    end
  end
end
