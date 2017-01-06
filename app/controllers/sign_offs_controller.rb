class SignOffsController < ApplicationController
  before_action :set_sign_off, only: [:edit, :update, :show, :destroy, :change_sign_off_status]

  def index
    @sign_offs =  if params[:filter_by].blank?
                    SignOff.all.order(sort_column + ' ' + sort_direction).page(params[:page]).per(Settings.pagination.default)
                  elsif params[:column_name] == 'sign_off_type_name'
                    SignOffType.find_by(params[:column_name] => params[:filter_by]).sign_offs
                  else
                    SignOff.where(params[:column_name] => params[:filter_by]).order(sort_column + ' ' + sort_direction)
                  end
    respond_to do |format|
      format.all do
        render json: {
          leaves_for_approval: current_user.request_for_approval.try(:reverse),
          pending_requests: current_user.pending_requests.try(:reverse),
          approved_requests: current_user.approved_requests.try(:reverse),
          rejected_requests: current_user.rejected_requests.try(:reverse)
        }
      end
    end
  end

  def pending_requests_count
    respond_to do |format|
      format.json { render json: { pending_requests_count: current_user.pending_requests.count } }
    end
  end

  def new
    @users = User.select(:email, :id).where.not(id: current_user.id)
    @sign_off_types = SignOffType.select(:id, :sign_off_type_name)
    @sign_off = SignOff.new
    respond_to do |format|
      format.json do
        render json: {
          sign_off: @sign_off,
          users: @users,
          sign_off_types: @sign_off_types
        }
      end
    end
  end

  def create
    @sign_off = SignOff.new(sign_off_params.merge!({ user_id: current_user.id, sign_off_status: "pending" }))
    @sign_off.sign_off_type = SignOffType.find(sign_off_params[:sign_off_type_id] )
    if @sign_off.save
      requestee_ids =  params[:sign_off][:requestee_ids] if params[:sign_off].present?
      requested_user_ids = requestee_ids.split(',').uniq
      send_leave_request_push_notification(requested_user_ids,@sign_off)
      requested_user_ids.each do |uid|
        SignOffRequester.create(user_id: uid, sign_off_id: @sign_off.id)
        Notification.create(user_id: uid, sign_off_id: @sign_off.id, notification_type: 'LeaveRequest')
        SignOffsMailer.leave_request_mail(uid).deliver_now
      end
      respond_to do |format|
        format.json{ render json: { success: true, leave_data: @sign_off} }
      end
    else
      respond_to do |format|
        format.json{ render json: { success: false, error: @sign_off.errors} }
      end
    end
  end

  def edit
    requested_users = JSON(@sign_off.users.select(:id, :name).to_json)
    @req_users = {}
    @sign_off.users.each do |user|
      @req_users = [{ id: user.id, name: user.name }]
    end
  end

  def update
    @sign_off.update_attributes(sign_off_params.merge!({ user_id: params[:user_id] }))
    redirect_to sign_offs_path
  end

  def show
    @sign_off.mark_notification_as_read(current_user)
    @sign_off_data = {
      comments: @sign_off.comments_with_user_data.reverse,
      requestee_name: @sign_off.requestee_name,
      user_name: current_user.name,
      designation: current_user.designation,
      leave_status: @sign_off.sign_off_status,
      date_from: @sign_off.date_from,
      date_to: @sign_off.date_to,
      leave_days: @sign_off.leave_days,
      leave_type: @sign_off.sign_off_type.sign_off_type_name,
      reason: @sign_off.reason,
      description: @sign_off.description,
      approved_rejected_by: @sign_off.approved_or_rejected_by
    }

    respond_to do |format|
      format.all { render json: @sign_off_data}
    end
  end

  def destroy
    @sign_off.destroy
    redirect_to sign_offs_path
  end

  def change_sign_off_status
    @sign_off.sign_off_status = params[:sign_off][:status]
    @sign_off.approved_rejected_by_id = params[:sign_off][:approved_rejected_by_id]
    notify_on_save = @sign_off.changes.keys.include?('sign_off_status')
    if @sign_off.save
      if notify_on_save
        send_leave_status_push_notification(@sign_off)
        requested_tos = @sign_off.sign_off_requesters.includes(:user).map(&:user) || []
        main_user = @sign_off.user
        request_send_to = (requested_tos.push(main_user) - [current_user]).compact
        request_send_to.each do |receiver|
          Notification.create(user_id: receiver.id, sign_off_id: @sign_off.id, notification_type: 'LeaveRequest')
          SignOffsMailer.request_status_change_notification(receiver, @sign_off, current_user).deliver_now
        end
      end
      respond_to do |format|
        format.json do
          render json: {
            success: true,
            leave: @sign_off
          }
        end
      end
    end
  end

  def fetch_new_notifications
    own_requests_notifications = current_user.own_requests_notifications
    others_requests_notifications = current_user.others_requests_notifications
    respond_to do |format|
      format.json { render json: {own_requests_notifications: own_requests_notifications,
          others_requests_notifications: others_requests_notifications
        }
      }
    end
  end

  def mark_all_notifications_as_read
    @notifications = current_user.notifications
    if @notifications.destroy_all
      respond_to do |format|
        format.json { render json: {notifications: @notifications}}
      end
    else
      respond_to do |format|
        format.json do
          logger.debug "SignOff::::mark_all_notifications_as_read >>> #{@notifications.errros}"
        end
      end
    end
  end

  def search
    @sign_offs = SignOff.where(sign_off_status: params[:search])
    respond_to do |format|
      format.all { render json: @sign_offs}
    end
  end

  private

  def send_leave_status_push_notification(sign_off)
    registration_ids = [sign_off.user.fcm_token]
    options = {data: {
          title: "#{sign_off.reason.titleize}",
          body: "Your Leave is #{sign_off.sign_off_status.titleize} by #{sign_off.approved_or_rejected_by}",
          priority: "high",
          show_in_foreground: true,
          local: true
        }}
    fcm_data(registration_ids, options)
  end

  def send_leave_request_push_notification(ids,sign_off)
    registration_ids = []
    ids.each do |id|
      registration_ids << User.find(id).fcm_token
    end
    options = {data: {
          title: "#{sign_off.reason.titleize}",
          body: "Leave Requested By #{sign_off.user.name.titleize}",
          priority: "high",
          show_in_foreground: true,
          local: true
        }}
    fcm_data(registration_ids, options)
  end

  def fcm_data(registration_ids,options)
    fcm = FCM.new(ENV['fcm_key'])
    fcm.send(registration_ids, options)
  end

  def set_sign_off
    @sign_off = SignOff.find(params[:id])
  end

  def sort_column
    SignOff.column_names.include?(params[:sort]) ? params[:sort] : 'id'
  end

  def sort_direction
    %w[asc desc].include?(params[:direction]) ? params[:direction] : 'asc'
  end

  def sign_off_params
    params.require(:sign_off).permit(:sign_off_type_id, :half_full_leave, :date_from, :date_to, :leave_days, :reason)
  end
end
