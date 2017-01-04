class SignOffTypesController < ApplicationController
  before_action :set_sign_off_type, only: [:edit, :update, :destroy]

  def index
    @sign_off_types = SignOffType.all.order(sort_column + ' ' + sort_direction)
    respond_to do |format|
      format.all { render json: { sign_off_types: @sign_off_types } }
    end
  end

  def new
    @sign_off_type = SignOffType.new
  end

  def create
    @sign_off_type = SignOffType.new(sign_off_type_params)
    if @sign_off_type.save
      respond_to do |format|
        format.all { render json: { success: true, sign_off_type: @sign_off_type}}
      end
    else
      respond_to do |format|
        format.all { render json: { success: false, errors: @sign_off_type.errors }}
      end
    end
  end

  def edit
  end

  def update
    @sign_off_type.update_attributes(sign_off_type_params)
    redirect_to sign_off_types_path
  end

  def destroy
    if @sign_off_type.destroy
      respond_to do |format|
        format.all { render json: { sign_off_type: @sign_off_type, success: true, leave_type_id: params[:id] } }
      end
    else
      respond_to do |format|
        format.all { render json: { errors: @sign_off_type.errors, success: false, leave_type_id: params[:id] } }
      end
    end
  end

  private

  def set_sign_off_type
    @sign_off_type = SignOffType.find(params[:id])
  end

  def sort_column
    SignOffType.column_names.include?(params[:sort]) ? params[:sort] : 'id'
  end

  def sort_direction
    %w[asc desc].include?(params[:direction]) ? params[:direction] : 'asc'
  end

  def sign_off_type_params
    params.require(:sign_off_type).permit(:sign_off_type_name, :no_of_days, :description)
  end
end
