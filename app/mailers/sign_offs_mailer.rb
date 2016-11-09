class SignOffsMailer < ApplicationMailer
  def leave_request_mail(user_id)
    @user = User.find(user_id)
    mail(to: @user.email, subject: 'New Leave Request')
  end 
end