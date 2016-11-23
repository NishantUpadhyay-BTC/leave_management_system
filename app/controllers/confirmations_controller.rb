# class ConfirmationsController < Devise::ConfirmationsController
#
#   def show
#     @user = User.find_by_confirmation_token(params[:confirmation_token])
#     if @user.confirmed_at != nil
#       if user_signed_in?
#         redirect_to root_url
#         flash[:notice] = "Already Confirmed"
#       else
#         redirect_to new_user_session_url
#         flash[:notice] = "Already Confirmed please login"
#       end
#     end
#   end
#
#    def confirm_user
#     @user = User.find_by_confirmation_token(params[:user][:confirmation_token])
#     if params[:user][:password] == params[:user][:password_confirmation]
#       @user = User.confirm_by_token(@user.confirmation_token)
#       @user.update(user_params)
#       sign_in @user
#       redirect_to root_url
#     else
#       redirect_to root_url
#       flash[:notice] = "password does not match"
#     end
#   end
#
#   def user_params
#     params.require(:user).permit(:name,:email,:designation,:gender,:date_of_joining,:date_of_birth,:avatar,:password)
#   end
# end
