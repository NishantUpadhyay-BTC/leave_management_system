class HolidaysController < ApplicationController
  before_action :authenticate_user!
  before_action :set_holiday, only: [:edit, :update, :destroy]

  def index
    @holidays = Holiday.all.order(sort_column + " " + sort_direction).page(params[:page]).per(5)
    
  end

  def new
    @holiday = Holiday.new
  end

  def create
    @holiday = Holiday.new(holiday_params)
    if @holiday.save
      redirect_to holidays_path
    else
      render :new
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
    params.require(:holiday).permit(:date,:description)
  end
end
