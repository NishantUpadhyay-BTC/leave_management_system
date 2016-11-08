class LeaveTypesController < ApplicationController
  before_action :set_leave_type, only: [:edit, :update, :destroy, :show]
  before_action :authenticate_user!

  def index
    @leave_types = LeaveType.all
  end

  def new
    @leave_type = LeaveType.new
  end

  def create
    @leave_type = LeaveType.new(leave_type_params)
    if @leave_type.save
      redirect_to leave_types_path
    else
      render 'new'
    end
  end

  def edit
  end

  def update
    @leave_type.update_attributes(leave_type_params)
    redirect_to leave_types_path
  end

  def show
  end

  def destroy
    @leave_type.destroy
    redirect_to leave_types_path
  end

  private

  def set_leave_type
    @leave_type = LeaveType.find(params[:id])
  end

  def leave_type_params
    params.require(:leave_type).permit(:leave_type_name, :no_of_days, :description)
  end
end