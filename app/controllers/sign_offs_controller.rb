class SignOffsController < ApplicationController
  # before_action :authenticate_user!
  before_action :set_sign_off, only: [:edit, :update, :show, :destroy, :change_sign_off_status]
  before_action :set_admin_list, only: [:new, :edit]

  def index
    @sign_offs = SignOff.where({user_id: current_user.id}).order(sort_column + " " + sort_direction).page(params[:page]).per(5)
  end

  def new
    @sign_off = SignOff.new
  end

  def create
    binding.pry
    @sign_off = SignOff.new(sign_off_params.merge!({ user_id: current_user.id, sign_off_status: "pending" }))
    @sign_off.sign_off_type = SignOffType.where(id: sign_off_params[:sign_off_type_id] ).first
    if @sign_off.save
      requestee_ids =  params[:sign_off][:requestee_ids]
      requestee_ids = requestee_ids.split(',').uniq
      requestee_ids.each do |uid|
        puts "sending email to requestees " + uid
        # SignOffRequester.create(user_id: uid, sign_off_id: @sign_off.id)
        # SignOffsMailer.leave_request_mail(uid).deliver_now
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
  end

  def destroy
    @sign_off.destroy
    redirect_to sign_offs_path
  end

  def change_sign_off_status
    @sign_off.sign_off_status = SignOff.sign_off_statuses[params[:status].to_sym]
    if @sign_off.save
      redirect_to admins_path
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
