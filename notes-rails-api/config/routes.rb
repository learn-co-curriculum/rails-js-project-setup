Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :notes, only: [:index, :create, :destroy, :update]
    end
  end
end
