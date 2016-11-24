class SignOffsController < ApplicationController
  before_action :set_sign_off, only: [:edit, :update, :show, :destroy, :change_sign_off_status]
  before_action :set_admin_list, only: [:new, :edit]


  def index
    respond_to do |format|
      format.json do
        render json: {
          leaves_for_approval: current_user.request_for_approval,
          pending_requests: current_user.pending_requests,
          approved_requests: current_user.approved_requests,
          rejected_requests: current_user.rejected_requests
        }
      end
    end
  end

  def new
    @sign_off = SignOff.new
  end

  def create
    @sign_off = SignOff.new(sign_off_params.merge!({ user_id: current_user.id, sign_off_status: "pending" }))
    @sign_off.sign_off_type = SignOffType.find(sign_off_params[:sign_off_type_id] )
    if @sign_off.save
      requestee_ids =  params[:sign_off][:requestee_ids] if params[:sign_off].present?
      requested_user_ids = requestee_ids.split(',').uniq
      requested_user_ids.each do |uid|
        SignOffRequester.create(user_id: uid, sign_off_id: @sign_off.id)
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
    @sign_off_data = {
      user_name: current_user.name,
      designation: current_user.designation,
      leave_status: @sign_off.sign_off_status,
      date_from: @sign_off.date_from,
      date_to: @sign_off.date_to,
      leave_days: @sign_off.leave_days,
      leave_type: @sign_off.sign_off_type.sign_off_type_name,
      reason: @sign_off.reason,
      description: @sign_off.description
    }
    respond_to do |format|
      format.json { render json: @sign_off_data}
    end
  end

  def destroy
    @sign_off.destroy
    redirect_to sign_offs_path
  end

  def change_sign_off_status
    @sign_off.sign_off_status = params[:status]
    if @sign_off.save
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

  private

  def set_sign_off
    @sign_off = SignOff.find(params[:id])
  end

  def sort_column
    SignOff.column_names.include?(params[:sort]) ? params[:sort] : 'id'
  end

  def sort_direction
    %w[asc desc].include?(params[:direction]) ? params[:direction] : 'asc'
  end

  def set_admin_list
    admins = User.with_role('admin')
    @admin_list = {}
    admin_list = JSON(admins.select(:name, :id).to_json)
    admin_list.each do |admin|
      @admin_list[admin['name'].upcase] = [{ id: admin['id'], text: admin['name']}]
    end
  end

  def sign_off_params
    params.require(:sign_off).permit(:sign_off_type_id, :half_full_leave, :date_from, :date_to, :leave_days, :reason)
  end
end
