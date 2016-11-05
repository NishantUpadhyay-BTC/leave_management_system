class AdminController < ApplicationController
  before_action :authenticate_user!
  def index
    @role = Role.find_by(name: "admin")
    @user = User.find_by(id: current_user,role_id: @role)
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
