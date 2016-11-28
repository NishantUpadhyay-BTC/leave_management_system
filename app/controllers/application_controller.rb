class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  include CanCan::ControllerAdditions
  protect_from_forgery with: :null_session

  before_filter :restrict_access, unless: :signin_action?
  before_action :configure_permitted_parameters, if: :devise_controller?

  rescue_from CanCan::AccessDenied do |exception|
    redirect_to root_url, :notice => exception.message
  end

  def restrict_access
    @current_user = User.find_by_access_token(params[:access_token])
    head :unauthorized unless @current_user
  end

  def signin_action?
    ['/', '/users/sign_in'].include?(request.path)
  end

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:account_update, keys: [:name, :email,:date_of_birth, :gender, :avatar, :designation, :password] )
  end
end
