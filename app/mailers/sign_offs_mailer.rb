class SignOffsMailer < ApplicationMailer
  def leave_request_mail(user_id)
    @user = User.find(user_id)
    mail(to: @user.email, subject: 'New Leave Request')
  end

  def request_status_change_notification(notify_to, leave, changed_by)
    @leave = leave
    @user = changed_by
    @leave_requested_by = @leave.user
    @notify_to = notify_to
    mail(to: notify_to.email, subject: 'Leave Request Status Changed')
  end
end
