require 'test_helper'

class ReportsControllerTest < ActionController::TestCase

  setup do
    @user = User.last
  end

  test 'generate report for employee leaves' do
    xhr :get, :generate_report, user_id: @user.id, year: 2016
    assert sign_offs_report = assigns(:sign_offs_report)
    report_response = JSON.parse(response.body)
    assert report_response['success']
    sign_offs_by_year_month = @user.sign_offs.includes(:sign_off_type).where('extract(year from date_from) = ? and extract(month from date_from) = ?', 2016, 11)
    assert_equal sign_offs_by_year_month.count, sign_offs_report['November'].count
  end

  test 'employee not found for generate report' do
    xhr :get, :generate_report, year: 2016
    report_response = JSON.parse(response.body)
    assert_equal false, report_response['success']
    assert_equal "Couldn't find User", report_response['error']
  end

  test 'comparision to employees sign offs' do
    xhr :get, :comparision_report, year: 2016
    assert comparision_report = assigns(:employee_comparision)
    report_response = JSON.parse(response.body)
    assert report_response['success']
    sign_offs = @user.sign_offs.includes(:sign_off_type).where("extract(year from date_from) = ?", 2016)
    assert_equal sign_offs.count, comparision_report['john'].values.inject(:+)
  end

  test 'comparision report not genearte without year' do
    xhr :get, :comparision_report
    report_response = JSON.parse(response.body)
    assert_equal false, report_response['success']
    assert_equal "Couldn't find without year", report_response['error']
  end
end
