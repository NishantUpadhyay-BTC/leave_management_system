class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  include CanCan::ControllerAdditions
  layout :set_layout

  rescue_from CanCan::AccessDenied do |exception|
    redirect_to root_url, :notice => exception.message
  end

  private

  def set_layout
    current_user ? 'application' : 'login'
  end
end