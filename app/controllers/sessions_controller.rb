class SessionsController < Devise::SessionsController
  respond_to :json
      def create
        binding.pry
         resource = User.find_for_database_authentication(:email=>params[:user][:email])
         return invalid_login_attempt unless resource

         if resource.valid_password?(params[:user][:password])
           sign_in("user", resource)
           render :json=> {:success=>true, :email=>resource.email, :name=>resource.name}
           return
         end
         invalid_login_attempt
     end
end
