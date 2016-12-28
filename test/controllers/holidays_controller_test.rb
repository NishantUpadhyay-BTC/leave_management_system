require 'test_helper'

class HolidaysControllerTest < ActionController::TestCase

  setup do
    @holiday = holidays(:one)
  end

  test 'holiday index' do
    xhr :get, :index
    assert_response 200
  end

  test 'create holiday' do
    assert_difference('Holiday.count', 1) do
      xhr :post, :create, holiday: { date: Date.today + 2 }
    end
    holiday_repsonse = JSON.parse(response.body)
    assert_equal true, holiday_repsonse['success']
  end

  test 'should not create holiday' do
    assert_no_difference('Holiday.count') do
      xhr :post, :create, holiday: { date: nil }
    end
    holiday_repsonse = JSON.parse(response.body)
    assert_equal false, holiday_repsonse['success']
  end

  test 'update holiday' do
    xhr :put, :update, id: @holiday, holiday: { name: 'sunday' }
    holiday_repsonse = JSON.parse(response.body)
    assert_equal true, holiday_repsonse['success']
  end

  test 'should not update holiday' do
    xhr :put, :update, id: @holiday, holiday: { date: nil }
    holiday_repsonse = JSON.parse(response.body)
    assert_equal false, holiday_repsonse['success']
  end

  test 'destroy holiday' do
    assert_difference('Holiday.count', -1) do
      xhr :delete, :destroy, id: @holiday
    end
    holiday_repsonse = JSON.parse(response.body)
    assert_equal true, holiday_repsonse['success']
    assert_match 'Holiday Removed successfully.', holiday_repsonse['message']
  end
end
