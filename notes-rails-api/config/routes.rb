Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :notes, only: [:index, :create, :destroy, :update] do
        resources :comments, only: [:create, :destroy, :update]
      end
    end
  end
end
