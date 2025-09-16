# frozen_string_literal: true

class GamesController < ApplicationController
  def index
    # @game = Game.new

    render inertia: 'Games/Index', props: {
    }
  end

def create
  @game = Game.create!

  cookies[:figure] = {
    value: @game.spawn_figure.to_json,
    httponly: false
  }

  cookies[:arr_down] = {
    value: [].to_json,
    httponly: false
  }

  redirect_to game_path(@game)
end

  def show
    game = Game.find(params[:id])

    figure = JSON.parse(cookies[:figure] || game.spawn_figure.to_json, symbolize_names: true)
    arr_down = JSON.parse(cookies[:arr_down] || "[]", symbolize_names: true)

    figure, arr_down = game.move_down(figure, arr_down)

    cookies[:figure] = { value: figure.to_json, httponly: false }
    cookies[:arr_down] = { value: arr_down.to_json, httponly: false }

    render inertia: "Games/Show", props: {
      game: game.as_json(only: [:id]), # чтобы game был лёгкий
      field: game.render_field(figure, arr_down)
    }
  end

end