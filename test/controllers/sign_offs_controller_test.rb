require 'test_helper'

class SignOffsControllerTest < ActionController::TestCase
  include Devise::Test::ControllerHelpers

  setup do
    @sign_offs = sign_offs(:sign_one, :sign_two, :sign_three, :sign_four, :sign_five)
    @user = users(:one)
    sign_in @user
  end

  test 'index for all' do
    xhr :get, :index
    assert_response 200
    assert_equal @sign_offs.count, assigns(:sign_offs).count
    assert_equal @sign_offs.sort, assigns(:sign_offs).sort
  end

  test 'searching for sign off status' do
    get :search, search: 'pending'
    assert_equal 2, assigns(:sign_offs).count
  end

  test 'sorting column' do
    get :index
    assert_equal SignOff.all.order('id' + ' ' + 'asc'), assigns(:sign_offs)
  end

  test 'pending requests count' do
    xhr :get, :pending_requests_count
    count = JSON.parse(response.body)
    assert_response 200
    assert_equal @user.pending_requests.count, count['pending_requests_count']
  end

  test 'create sign off' do
    sign_off_requester_count = SignOffRequester.count
    notification_count = Notification.count
    assert_difference('SignOff.count', 1) do
      xhr :post, :create, sign_off: { sign_off_type_id: sign_off_types(:one), half_full_leave: 'full', date_from: Date.today + 1, date_to: Date.today + 3, reason: 'this is the reason', requestee_ids: users(:two) }
    end
    sign_off_response = JSON.parse(response.body)
    assert_equal true, sign_off_response['success']
    assert_equal sign_off_requester_count + 1, SignOffRequester.count
    assert_equal notification_count + 1, Notification.count
    assert_equal SignOff.last, assigns(:sign_off)
  end

  test 'sign off should not create' do
    sign_off_requester_count = SignOffRequester.count
    notification_count = Notification.count
    assert_no_difference 'SignOff.count' do
      xhr :post, :create, sign_off: { sign_off_type_id: sign_off_types(:one), half_full_leave: 'full', reason: 'this is the reason', requestee_ids: users(:two) }
    end
    sign_off_response = JSON.parse(response.body)
    assert_equal false, sign_off_response['success']
    assert_equal sign_off_requester_count, SignOffRequester.count
    assert_equal notification_count, Notification.count
    assert_equal ["can't be blank"], sign_off_response['error']['date_from']
    assert_equal ["can't be blank"], sign_off_response['error']['date_to']
  end

  test 'update sign off' do
    put :update, id: @sign_offs.first, user_id: @user, sign_off: { reason: 'suffering from fever' }
    assert_match 'suffering from fever', assigns(:sign_off).reason
    assert_equal @sign_offs.first, assigns(:sign_off)
    assert_redirected_to sign_offs_path
  end

  test 'show sign off' do
    xhr :get, :show, id: @sign_offs.first
    assert assigns(:sign_off_data)
    assert_equal @sign_offs.first, assigns(:sign_off)
    sign_off_response = JSON.parse(response.body)
    assert_equal @user.name, sign_off_response['user_name']
    assert_equal @sign_offs.first.requestee_name, sign_off_response['requestee_name']
  end

  test 'destroy sign off' do
    sign_off_count = SignOff.count
    delete :destroy, id: @sign_offs.first
    assert_equal sign_off_count - 1, SignOff.count
    assert_equal @sign_offs.first, assigns(:sign_off)
    assert_redirected_to sign_offs_path
  end

  test 'change sign off status' do
    xhr :post, :change_sign_off_status, id: @sign_offs.first, sign_off: { status: 'approved', approved_rejected_by_id: users(:two)}
    assert_equal 'approved', assigns(:sign_off).sign_off_status
    assert_equal @sign_offs.first, assigns(:sign_off)
    assert_equal users(:two).id, assigns(:sign_off).approved_rejected_by_id
  end

  test 'mark all notifications as read' do
    xhr :get, :mark_all_notifications_as_read
    assert_equal @user.notifications.count, assigns(:notifications).count
    assert_equal @user.notifications, assigns(:notifications)
  end
end
