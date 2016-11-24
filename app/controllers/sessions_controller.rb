class SessionsController < Devise::SessionsController
  respond_to :json
  def create
    resource = User.find_for_database_authentication(:email=>params[:user][:email])
    return invalid_login_attempt unless resource

    if resource.valid_password?(params[:user][:password])
      sign_in("user", resource)
      session[:access_token] = resource.access_token
      render json: { :success=>true,
          user: { :email=>resource.email,
            :name=>resource.name,
            :access_token => resource.access_token,
            designation: resource.designation,
            gender: resource.gender,
            date_of_joining: resource.date_of_joining,
            date_of_birth: resource.date_of_birth,
            roles: resource.roles.pluck(:name)
            }
          }
      return
    end
    invalid_login_attempt
  end

  def destroy
    success = false
    success = ture if session.clear
    message = (success ? "You are logged out Successfully!" : "Unable to Logout.")
    respond_to do |format|
      format.json do
        render json: { success: success, message: message }
      end
    end
  end

  private

  def invalid_login_attempt
   warden.custom_failure!
   render :json=> {:success=>false, :message=>"Error with your login or password"}, :status=>401
 end
end
