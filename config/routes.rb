Rails.application.routes.draw do

  devise_for :users, :path_prefix => 'd'
  resources :users, :only =>[:show]
  get 'welcome/index'

  resources :questions do
    resources :answers, :only => [:create, :destroy, :index]
  end

  resources :users, :only => [:show, :index] do
  member do
    get :follow
    get :unfollow
  end
end

  match 'galleries/show', to: 'galleries#show', via: 'get'

  match 'app/', to: 'app#index', via: 'get'
  match 'app/*all', to: 'app#index', via: 'get'

  resources :profiles, :only => [:show, :create, :index]

  match '/api/app/senduser', to: 'app#user', via: 'get'
  match '/api/app/sendfollows', to: 'app#follows', via: 'get'
  match '/api/app/sendquestions', to: 'app#questions', via: 'get'
  match '/api/app/sendanswers', to: 'app#answers', via: 'get'

  match '/api/app/listofusers', to: 'app#listofusers', via: 'get'
  match '/api/app/followunfollow', to: 'app#followunfollow', via: 'get'

  match '/api/app/users/follow', to: 'users#follow', via: 'get'

  match '/questions/:id/answers', to: 'answers#create', via: 'post'



  scope '/api' do
    scope '/questions' do
      get '/' => 'questions#index'
      post '/' => 'questions#create'
      delete '/' => 'questions#destroy'
      scope '/senduser' do
        get '/'  => 'questions#senduser'
      end
    end
  end



  root 'welcome#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end