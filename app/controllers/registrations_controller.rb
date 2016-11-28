class RegistrationsController < Devise::RegistrationsController
    respond_to :json, :controllers => {sessions: 'sessions', registrations: 'registrations'}
    before_filter :configure_permitted_parameters

    protected

    def configure_permitted_parameters
      added_attrs = [:name, :email, :password, :password_confirmation]
      devise_parameter_sanitizer.permit(:sign_up, keys: added_attrs)
      devise_parameter_sanitizer.permit(:account_update, keys: [:name, :email, :password, :password_confirmation, :current_password, ])
    end
end
