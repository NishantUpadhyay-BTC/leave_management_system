require 'test_helper'

class EmployeeLeaveReportTest < ActiveSupport::TestCase

  setup do
    @user = users(:one)
    @year = 2016
  end

  test 'generate report for employee' do
    sign_offs_report = Reports::EmployeeLeaveReport.new.generate_report(@user.id, @year)
    sign_offs_by_year_month = @user.sign_offs.includes(:sign_off_type).where('extract(year from date_from) = ? and extract(month from date_from) = ?', @year, 11)
    assert_equal sign_offs_by_year_month.count, sign_offs_report['November'].count
    sorted_sign_offs = sign_offs_by_year_month.pluck(:date_from, :'sign_off_types.sign_off_type_name')
    assert_equal sorted_sign_offs.to_h ,sign_offs_report['November']
  end

  test 'comparision report of employees' do
    sign_offs_report = Reports::EmployeeLeaveReport.new.comparision_report(@year)
    sign_offs = @user.sign_offs.includes(:sign_off_type).where("extract(year from date_from) = ?", @year)
    assert_equal sign_offs.count, sign_offs_report['john'].values.inject(:+)
    sign_off_type_expected = sign_offs.pluck(:'sign_off_types.sign_off_type_name').inject(Hash.new(0)) { |total, e| total[e] += 1 ;total}
    assert_equal sign_off_type_expected, sign_offs_report['john']
  end
end
