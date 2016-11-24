Rails.application.routes.draw do

  root 'home#index'
  get '/request_leave' => 'home#index'
  get '/leave_details/request_leave' => 'home#index'
  get '*path' => 'home#index'
  post 'admins/import_user'
  get 'pending_requests_count' => "sign_offs#pending_requests_count"
  devise_for :users, :controllers => {sessions: 'sessions', registrations: 'registrations'}
  #
  # devise_scope :user do
  #   resources :confirmations do
  #     member do
  #       patch "confirm_user"
  #       get "confirmation"
  #     end
  #   end
  # end
  #
  # resources :admins do
  #   collection do
  #     get 'notifications' => 'admins#notifications'
  #     get 'employee_details' => 'admins#employee_details'
  #   end
  # end
  resources :sign_off_types, except: :show
  #
  resources :sign_offs do
    member do
      post 'change_status' => 'sign_offs#change_sign_off_status'
    end
  end
  #
  resources :holidays, except: :show
  resources :profiles
  get '*path' => 'home#index'
end
