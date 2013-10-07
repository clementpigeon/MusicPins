MusicPins::Application.routes.draw do

  resources :users, :only => [:create, :new, :show]

  resource :session, :only => [:create, :destroy, :new]

  resources :pins, only: [:show, :create, :destroy, :index]

  root :to => "pins#index"

end
