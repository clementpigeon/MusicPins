MusicPins::Application.routes.draw do

  resources :users, :only => [:create, :new, :show] do
    resources :pins, only: [:index]
  end

  resource :session, :only => [:create, :destroy, :new]

  root :to => "pins#index"

end
