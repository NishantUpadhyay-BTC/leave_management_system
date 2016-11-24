class HolidaysController < ApplicationController
  before_action :authenticate_user!
  before_action :set_holiday, only: [:edit, :update, :destroy]

  def index
    @holidays = Holiday.all
    respond_to do |format|
      format.json { render json: {holidays: @holidays } }
    end
  end

  def new
    @holiday = Holiday.new
  end

  def create
    @holiday = Holiday.new(holiday_params)
    if @holiday.save
      respond_to do |format|
        format.json { render json: {holiday: @holiday, success: true} }
      end
    else
      respond_to do |format|
        format.json { render json: {errors: @holiday.errors, success: false} }
      end
    end
  end

  def edit
  end

  def update
    @holiday.update_attributes(holiday_params)
    redirect_to holidays_path
  end

  def destroy
    @holiday.destroy
    redirect_to holidays_path
  end

  private

  def set_holiday
    @holiday = Holiday.find(params[:id])
  end

  def sort_column
    Holiday.column_names.include?(params[:sort]) ? params[:sort] : 'id'
  end

  def sort_direction
    %w[asc desc].include?(params[:direction]) ? params[:direction] : 'asc'
  end

  def holiday_params
    params.require(:holiday).permit(:date,:name)
  end
end
