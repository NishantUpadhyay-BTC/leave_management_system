class AdminsController < ApplicationController
  before_action :authenticate_user!, except: [:update]
  before_action :set_admin, only: [:show, :edit, :update, :destroy]

  def index
    @employees = User.with_role('employee')
    @pending_sign_offs = current_user.sign_offs.where(leave_status: 'pending')
    @approved_sign_offs = current_user.sign_offs.where(leave_status: 'approved')
  end

  def new
    @user = User.new
  end

  def edit
  end

  def show
  end

  def create
    @user = User.new(admin_params)
    @role = Role.find_by_name(params[:user][:role_id])
    @user.role_id = @role.id
    @user.password = SecureRandom.hex(8)
    respond_to do |format|
      if @user.save
        format.html { redirect_to root_url, notice: 'User created!' }
      else
        format.html { render :new }
      end
    end
  end

  def update
    @role = Role.find_by_name(params[:user][:role_id])
    params[:user][:role_id] = @role.id if params[:user][:role_id]
    respond_to do |format|
      if params[:user][:password] != params[:user][:password_confirmation]
        format.html { render :edit }
        flash[:notice] = "Password and confirmation Password does not match"
      else
        if @user.update(admin_params)
          sign_in @user
          format.html { redirect_to admins_path, notice: 'successfully updated.' }
        else
          format.html { render :edit }
        end
      end
    end
  end

  def destroy
    @user.destroy
    respond_to do |format|
      format.html { redirect_to admins_path, notice: 'successfully destroyed.' }
    end
  end

  def import_user
    if params[:file] != nil
      User.import_user(params[:file])
      redirect_to root_url, notice: "Data Imported!"
    else
      redirect_to root_url, notice: "Please Select File"
    end
  end

  def set_admin
    @user = User.find(params[:id])
  end

  def admin_params
    params.require(:user).permit(:name,:email,:designation,:gender,:date_of_joining,:date_of_birth,:role_id,:password,:avatar)
  end
end
