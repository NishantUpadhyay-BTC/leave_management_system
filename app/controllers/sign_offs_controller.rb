class SignOffsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_sign_off, only: [:edit, :update, :show, :destroy]

  def index
    @sign_offs = SignOff.where({user_id: current_user.id})
  end

  def new
    @sign_off = SignOff.new
    @admins = User.with_role('admin')
  end

  def create
    @sign_off = SignOff.new(sign_off_params.merge!({ user_id: current_user.id, leave_status: 'pending' }))
    if @sign_off.save
      users_ids = params[:sign_off][:user_id]
      users_ids.delete_at(0)
      users_ids.each do |uid|
        LeaveRequester.create(user_id: uid, sign_off_id: @sign_off.id)
      end
      redirect_to sign_offs_path
    else
      render :new
    end
  end

  def edit
  end

  def update
    @sign_off.update_attributes(sign_off_params)
    redirect_to sign_offs_path
  end

  def show
  end

  def destroy
    @sign_off.destroy
    redirect_to sign_offs_path 
  end

  private

  def set_sign_off
    @sign_off = SignOff.find(params[:id])
  end

  def sign_off_params
    params.require(:sign_off).permit(:leave_type_id, :half_full_leave, :date_from, :date_to, :leave_days, :reason)
  end
end