require 'test_helper'

class EmployeeLeaveReportTest < ActiveSupport::TestCase

  setup do
    @user = create(:user_with_sign_off)
    @year = 2016
  end

  test 'generate report for employee' do
    report_data
    sign_offs_report = Reports::EmployeeLeaveReport.new.generate_report(@user.id, @year)
    sign_offs_by_year_month = @user.sign_offs.includes(:sign_off_type).where('extract(year from date_from) = ? and extract(month from date_from) = ?', @year, 11)
    assert_equal sign_offs_by_year_month.count, sign_offs_report['November'].count
    sorted_sign_offs = sign_offs_by_year_month.pluck(:date_from, :'sign_off_types.sign_off_type_name')
    assert_equal sorted_sign_offs.to_h ,sign_offs_report['November']
  end

  test 'comparision report of employees' do
    report_data
    sign_offs_report = Reports::EmployeeLeaveReport.new.comparision_report(@year)
    sign_offs = @user.sign_offs.includes(:sign_off_type).where("extract(year from date_from) = ?", @year)
    assert_equal sign_offs.count, sign_offs_report['johnna'].values.inject(:+)
    sign_off_type_expected = sign_offs.pluck(:'sign_off_types.sign_off_type_name').inject(Hash.new(0)) { |total, e| total[e] += 1 ;total}
    assert_equal sign_off_type_expected, sign_offs_report['johnna']
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
