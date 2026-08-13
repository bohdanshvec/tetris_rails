# frozen_string_literal: true

class GamesController < ApplicationController
  def index
    render inertia: "Games/Index", props: {}
  end

  def create
    @game = Game.create!(
      speed: params[:speed],
    )

    redirect_to game_path(@game)
  end

  def show
    game = Game.find(params[:id])

    render inertia: "Games/Show", props: {
      game_id: game.id,
      speed: game.speed,
    }
  end

  def quit
    game = Game.find(params[:id])
    game.destroy!

    redirect_to games_path
  end

  def finish
    game = Game.find(params[:id])
    
    game.touch

    head :ok
  end
end
