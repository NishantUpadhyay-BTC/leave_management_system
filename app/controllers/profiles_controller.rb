class ProfilesController < ApplicationController
  def show
    if !current_user.is_admin? && current_user.id != params[:id].to_i
      respond_to do |format|
        format.json { render json: { success: false, errors: "Sorry, But you can't access other user's profile." }, status: 401 }
      end
    elsif current_user.is_admin? && current_user.id != params[:id].to_i
      @profille = User.find(params[:id]).profile
      respond_to do |format|
        format.json { render json: @profile }
      end
    elsif current_user.id == params[:id].to_i
      @profile = current_user.profile
      respond_to do |format|
        format.json { render json: @profile }
      end
    end
  end
end
