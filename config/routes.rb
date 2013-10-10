MusicPins::Application.routes.draw do

  resources :users, :only => [:create, :new, :show]

  resource :session, :only => [:create, :destroy, :new]

  resources :pins, only: [:show, :create, :destroy, :index]

  resources :songs, only: [:create, :index]

  resources :bands, only: [:create, :index]

  resources :comments, only: [:create, :index, :show, :destroy]

  root :to => "pins#index"

end
