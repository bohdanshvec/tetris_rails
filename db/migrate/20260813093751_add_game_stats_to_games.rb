class AddGameStatsToGames < ActiveRecord::Migration[8.0]
  def change
    add_column :games, :speed, :string
    add_column :games, :lines, :integer
    add_column :games, :duration, :integer
  end
end
