class ReportsController < ApplicationController

  def generate_report
    user = User.find_by(id: params[:user_id])
    if user.present? && params[:year].present?
      @sign_offs_report = Reports::EmployeeLeaveReport.new.generate_report(params[:user_id], params[:year])
      respond_to do |format|
        format.json{ render json: { sign_offs_report: @sign_offs_report, success: true } }
      end
    else
      respond_to do |format|
        format.json{ render json: { success: false, error: "Couldn't find User" } }
      end
    end
  end

  def comparision_report
    if params[:year].present?
      @employee_comparision = Reports::EmployeeLeaveReport.new.comparision_report(params[:year])
      respond_to do |format|
        format.json{ render json: { employee_comparision: @employee_comparision, success: true } }
      end
    else
      respond_to do |format|
        format.json{ render json: { success: false, error: "Couldn't find without year" } }
      end
    end
  end
end
