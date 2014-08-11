Rails.application.routes.draw do
  root to: 'sessions#new'
  
  resources :users
  resource :session
  
  namespace :api, defaults: { format: :json } do
    resources :questions
    resources :answers
    resources :comments
    resources :votes
    resources :users, only: [:show]
  end
end
