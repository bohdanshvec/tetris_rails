# frozen_string_literal: true

class GamesController < ApplicationController
  def index
    # @game = Game.new

    render inertia: "Games/Index", props: {}
  end

  def create
    @game = Game.create!

    cookies[:figure] = {
      value: Tetris::Figure.add_figure.to_json,
      httponly: false,
    }

    cookies[:arr_down] = {
      value: [].to_json,
      httponly: false,
    }

    redirect_to game_path(@game)
  end

  def show
    game = Game.find(params[:id])

    figure = JSON.parse(cookies[:figure] || Tetris::Figure.add_figure.to_json, symbolize_names: true)
    arr_down = JSON.parse(cookies[:arr_down] || "[]", symbolize_names: true)

    render inertia: "Games/Show", props: {
      game_id: game.id, # вместо целого объекта game
      field: Tetris::Field.render_field(figure, arr_down),
    }
  end

  def step
    # 1. Проверяем выход из игры (Escape)
    figure = JSON.parse(cookies[:figure] || Tetris::Figure.add_figure.to_json, symbolize_names: true)
    arr_down = JSON.parse(cookies[:arr_down] || "[]", symbolize_names: true)

    # --- обработка выхода (Escape) ---
    if params[:quit].present? && params[:quit].to_s == "true"
      cookies.delete(:figure)
      cookies.delete(:arr_down)
      # можно пометить игру завершённой в БД, если нужно:
      # @game.update!(finished: true) if @game.respond_to?(:finished)
      # вернём пользователя в список игр
      return redirect_to games_path
    end

    figure, arr_down = Tetris::Move.move_down(figure, arr_down)

    cookies[:figure] = { value: figure.to_json, httponly: false }
    cookies[:arr_down] = { value: arr_down.to_json, httponly: false }

    # 2. Направление (стрелочки)
    
    render inertia: "Games/Show", props: {
      game_id: params[:id], # тоже передаём только id
      field: Tetris::Field.render_field(figure, arr_down),
    }
  end

  # def step
  #   # game = Game.find(params[:id])

  #   figure = JSON.parse(cookies[:figure], symbolize_names: true)
  #   arr_down = JSON.parse(cookies[:arr_down], symbolize_names: true)

  #   figure, arr_down = Tetris::Move.move_down(figure, arr_down)

  #   cookies[:figure] = { value: figure.to_json, httponly: false }
  #   cookies[:arr_down] = { value: arr_down.to_json, httponly: false }

  #   render inertia: "Games/Show", props: {
  #     # game: game.as_json(only: [:id]),
  #     field: Tetris::Field.render_field(figure, arr_down),
  #   }
  # end
end
