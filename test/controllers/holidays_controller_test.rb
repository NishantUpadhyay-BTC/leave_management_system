require 'test_helper'

class HolidaysControllerTest < ActionController::TestCase

  setup do
    @user = create(:user)
    @holiday = create(:holiday)
    @holiday_other = create(:holiday, :xmas)
  end

  test 'current year holidays' do
    xhr :get, :index, access_token: @user.access_token
    assert_response 200, 'success'
    assert current_year_holidays = assigns(:current_year_holidays)
    assert_equal 2, current_year_holidays.count
    assert current_year_holidays.include?(@holiday)
  end

  test 'sorting by date' do
    get :index, sort: :date, direction: :desc, access_token: @user.access_token
    assert holidays = assigns(:current_year_holidays)
    assert_equal @holiday_other, holidays.first
    assert_equal @holiday, holidays.last
  end

  test 'create holiday with valid details' do
    assert_difference('Holiday.count', 1) do
      xhr :post, :create, holiday: { date: Date.today + 2 }, access_token: @user.access_token
    end
    holiday_response = JSON.parse(response.body)
    assert_equal true, holiday_response['success']
    assert holiday = assigns(:holiday)
    assert_equal Holiday.last, holiday
  end

  test 'should not be created holiday without date' do
    assert_no_difference('Holiday.count') do
      xhr :post, :create, holiday: { date: nil }, access_token: @user.access_token
    end
    holiday_response = JSON.parse(response.body)
    assert_equal false, holiday_response['success']
    assert_match "can't be blank", holiday_response['errors']['date'].to_s
  end

  test 'update holiday with valid details' do
    assert_equal nil, @holiday.name
    xhr :put, :update, id: @holiday, holiday: { name: 'sunday' }, access_token: @user.access_token
    holiday_response = JSON.parse(response.body)
    assert_equal true, holiday_response['success']
    assert holiday = assigns(:holiday)
    assert_equal @holiday, holiday
    assert_match 'sunday', assigns(:holiday).name
  end

  test 'should not be updated holiday with incorrect/nil date' do
    xhr :put, :update, id: @holiday, holiday: { date: nil }, access_token: @user.access_token
    holiday_response = JSON.parse(response.body)
    assert_equal false, holiday_response['success']
    assert_match "can't be blank", holiday_response['errors']['date'].to_s
  end

  test 'destroy holiday' do
    assert_difference('Holiday.count', -1) do
      xhr :delete, :destroy, id: @holiday, access_token: @user.access_token
    end
    holiday_response = JSON.parse(response.body)
    assert_equal true, holiday_response['success']
    assert_match 'Holiday Removed successfully.', holiday_response['message']
    assert_equal @holiday.id, holiday_response['holiday_id'].to_i
    assert holiday = assigns(:holiday)
    assert_equal false, Holiday.all.include?(holiday)
  end
end
