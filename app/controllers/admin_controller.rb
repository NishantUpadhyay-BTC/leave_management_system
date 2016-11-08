class AdminController < ApplicationController
  before_action :authenticate_user!

  def index
    @employees = User.joins(:role).where(roles: {name: 'employee'})
  end

  def import
    if params[:file] != nil
      User.import(params[:file])
      redirect_to root_url, notice: "Data Imported!"
    else
      redirect_to root_url, notice: "Please Select File"
    end
  end
end
