Rails.application.routes.draw do
  get 'inertia-example', to: 'inertia_example#index'

  get "up" => "rails/health#show", as: :rails_health_check

  resources :games, only: [:index, :create, :show]

  root "games#index"
end
