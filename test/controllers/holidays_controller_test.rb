require 'test_helper'

class HolidaysControllerTest < ActionController::TestCase

  setup do
    @holiday = holidays(:one)
  end

  test 'holiday index' do
    xhr :get, :index
    assert_response 200
    assert_equal 2, assigns(:current_year_holidays).count
  end

  test 'create holiday' do
    assert_difference('Holiday.count', 1) do
      xhr :post, :create, holiday: { date: Date.today + 2 }
    end
    holiday_response = JSON.parse(response.body)
    assert_equal true, holiday_response['success']
    assert_equal Holiday.last, assigns(:holiday)
  end

  test 'should not create holiday' do
    assert_no_difference('Holiday.count') do
      xhr :post, :create, holiday: { date: nil }
    end
    holiday_response = JSON.parse(response.body)
    assert_equal false, holiday_response['success']
    assert_equal ["can't be blank"], holiday_response['errors']['date']
  end

  test 'update holiday' do
    xhr :put, :update, id: @holiday, holiday: { name: 'sunday' }
    holiday_response = JSON.parse(response.body)
    assert_equal true, holiday_response['success']
    assert_equal @holiday, assigns(:holiday)
  end

  test 'should not update holiday' do
    xhr :put, :update, id: @holiday, holiday: { date: nil }
    holiday_response = JSON.parse(response.body)
    assert_equal false, holiday_response['success']
    assert_equal ["can't be blank"], holiday_response['errors']['date']
  end

  test 'destroy holiday' do
    assert_difference('Holiday.count', -1) do
      xhr :delete, :destroy, id: @holiday
    end
    holiday_response = JSON.parse(response.body)
    assert_equal true, holiday_response['success']
    assert_match 'Holiday Removed successfully.', holiday_response['message']
    assert_equal @holiday.id, holiday_response['holiday_id'].to_i
  end
end
