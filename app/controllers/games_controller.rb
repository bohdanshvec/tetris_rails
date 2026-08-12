# frozen_string_literal: true

class GamesController < ApplicationController
  def index
    render inertia: "Games/Index", props: {}
  end

  def create
    @game = Game.create!

    redirect_to game_path(@game)
  end

  def show
    game = Game.find(params[:id])

    render inertia: "Games/Show", props: {
      game_id: game.id,
    }
  end
end
