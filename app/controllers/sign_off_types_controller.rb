class SignOffTypesController < ApplicationController
  before_action :set_sign_off_type, only: [:edit, :update, :destroy]
  before_action :authenticate_user!

  def index
    @sign_off_types = SignOffType.all.order(:id).page(params[:page]).per(5)
  end

  def new
    @sign_off_type = SignOffType.new
  end

  def create
    @sign_off_type = SignOffType.new(sign_off_type_params)
    if @sign_off_type.save
      redirect_to sign_off_types_path
    else
      render 'new'
    end
  end

  def edit
  end

  def update
    @sign_off_type.update_attributes(sign_off_type_params)
    redirect_to sign_off_types_path
  end

  def destroy
    @sign_off_type.destroy
    redirect_to sign_off_types_path
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