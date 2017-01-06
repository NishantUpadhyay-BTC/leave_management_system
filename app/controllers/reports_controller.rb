class ReportsController < ApplicationController

  def generate_report
    Reports::EmployeeLeaveReport.new.generate_report(params[:user_id], params[:year])
  end

  def comparision_report
    Reports::EmployeeLeaveReport.new.comparision_report(params[:year])
  end
end
