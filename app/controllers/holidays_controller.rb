class HolidaysController < ApplicationController
  before_action :authenticate_user!
  before_action :set_holiday, only: [:edit, :update, :destroy]

  def index
    @holidays = Holiday.all.order(sort_column + " " + sort_direction).page(params[:page]).per(5)
  end

  def new
    @holiday = Holiday.new
  end
  
  def edit
  end
  def create
    @holiday = Holiday.new(holiday_params)
    respond_to do |format|
      if @holiday.save
        format.html { redirect_to holidays_path, notice: 'Holiday insert.' }
      else
        format.html { render :new }
      end
    end
  end
	

  def destroy
    @holiday.destroy
    respond_to do |format|
      format.html { redirect_to holidays_path, notice: 'successfully destroyed.' }
    end
  end
  
  def update
    respond_to do |format|
      if @holiday.update(holiday_params)
        format.html { redirect_to holidays_path, notice: 'successfully updated.' }
      else
        format.html { render :edit }
      end
    end
  end
  
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
