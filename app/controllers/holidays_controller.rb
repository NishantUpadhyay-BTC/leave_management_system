class HolidaysController < ApplicationController
  before_action :set_holiday, only: [:show, :edit, :update, :destroy]

  def index
    @holidays = Holiday.all
  end

  def new
    @holiday = Holiday.new
  end
  def show
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
  
  def holiday_params
    params.require(:holiday).permit(:date,:description)
  end
end
