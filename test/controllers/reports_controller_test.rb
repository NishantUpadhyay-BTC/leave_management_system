require 'test_helper'

class ReportsControllerTest < ActionController::TestCase
  
  setup do
    @user = create(:user_with_sign_off)
    @year = 2016
  end

  test 'generate report for employee leaves' do
    report_data
    xhr :get, :generate_report, user_id: @user.id, year: @year, access_token: @user.access_token
    assert sign_offs_report = assigns(:sign_offs_report)
    report_response = JSON.parse(response.body)
    assert report_response['success']
    sign_offs_by_year_month = @user.sign_offs.includes(:sign_off_type).where('extract(year from date_from) = ? and extract(month from date_from) = ?', @year, 11)
    assert_equal sign_offs_by_year_month.count, sign_offs_report['November'].count
  end

  test 'employee not found for generate report' do
    xhr :get, :generate_report, year: @year, access_token: @user.access_token
    report_response = JSON.parse(response.body)
    assert_equal false, report_response['success']
    assert_equal "Couldn't find User", report_response['error']
  end

  test 'comparision to employees sign offs' do
    xhr :get, :comparision_report, year: @year, access_token: @user.access_token
    assert comparision_report = assigns(:employee_comparision)
    report_response = JSON.parse(response.body)
    assert report_response['success']
    sign_offs = @user.sign_offs.includes(:sign_off_type).where("extract(year from date_from) = ?", @year)
    assert_equal sign_offs.count, comparision_report['johnna'].values.inject(:+)
  end

  test 'comparision report not genearte without year' do
    xhr :get, :comparision_report, access_token: @user.access_token
    report_response = JSON.parse(response.body)
    assert_equal false, report_response['success']
    assert_equal "Couldn't find without year", report_response['error']
  end

  private

  def report_data
    SignOff.destroy_all
    date = Date.parse('1/11/2016')
    3.times do
      create(:sign_off, sign_off_type: create(:sign_off_type), date_from: date, user: @user )
      date += 1
      create(:sign_off, sign_off_type: create(:sign_off_type, :casual), date_from: date, user: @user )
      date += 1
    end    
  end
end
