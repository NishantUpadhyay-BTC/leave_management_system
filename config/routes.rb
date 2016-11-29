Rails.application.routes.draw do

  root 'home#index'
  get '/request_leave' => 'home#index'
  get '/leave_details/request_leave' => 'home#index'
  post 'admins/import_user'
  get 'pending_requests_count' => "sign_offs#pending_requests_count"
  get '/fetch_new_notifications' => "sign_offs#fetch_new_notifications"
  get '/mark_all_notifications_as_read' => 'sign_offs#mark_all_notifications_as_read'
  devise_for :users, :controllers => {sessions: 'sessions', registrations: 'registrations'}
  get '/current_year_holidays' => 'holidays#index'
  post '/add_holiday' => 'holidays#create'
  delete '/delete_holiday/:id' => 'holidays#destroy'

  resources :sign_off_types, except: :show

  resources :sign_offs do
    resources :comments
    member do
      post 'change_status' => 'sign_offs#change_sign_off_status'
    end
  end

  resources :profiles
  get '*path' => 'home#index'
end
