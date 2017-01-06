require 'test_helper'

class SignOffsControllerTest < ActionController::TestCase
  include Devise::Test::ControllerHelpers

  setup do
    @sign_offs = sign_offs(:sign_one, :sign_two, :sign_three, :sign_four, :sign_five)
    @user = users(:one)
    sign_in @user
  end

  test 'show all sign offs' do
    xhr :get, :index
    assert_response 200, 'success'
    assert sign_offs = assigns(:sign_offs)
    assert_equal @sign_offs.count, sign_offs.count
    assert_equal @sign_offs.sort, sign_offs.sort
  end

  test 'searching for sign off status' do
    get :search, search: 'pending'
    assert sign_offs = assigns(:sign_offs)
    assert_equal 2, sign_offs.count
  end

  test 'sorting columns of all sign offs' do
    xhr :get, :index, sort: :sign_off_status, direction: :desc
    assert sign_offs = assigns(:sign_offs)
    assert_equal sign_offs(:sign_three), sign_offs.first
    assert_equal sign_offs(:sign_five), sign_offs.last
    get :index, sort: :date_from, direction: :asc
    assert sign_offs = assigns(:sign_offs)
    assert_equal sign_offs(:sign_three), sign_offs.first
    assert_equal sign_offs(:sign_one), sign_offs.last
  end

  test 'filter by sign_off_status column' do
    xhr :get, :index, column_name: :sign_off_status, filter_by: :approved
    assert sign_offs = assigns(:sign_offs)
    sign_offs_expected = SignOff.where(sign_off_status: 'approved')
    assert_equal sign_offs_expected.sort, sign_offs.sort
    xhr :get, :index, column_name: :sign_off_status, filter_by: :approved, sort: :date_from, direction: :desc
    assert sign_offs = assigns(:sign_offs)
    assert_equal sign_offs(:sign_four), sign_offs.first
    assert_equal sign_offs(:sign_five), sign_offs.second
  end

  test 'filter by date_from column' do
    xhr :get, :index, column_name: :date_from, filter_by: '10/11/2016'
    assert sign_offs = assigns(:sign_offs)
    sign_offs_expected = SignOff.where(date_from: '10/11/2016')
    assert_equal sign_offs_expected.sort, sign_offs.sort
    xhr :get, :index, column_name: :date_from, filter_by: '10/11/2016', sort: :date_to, direction: :desc
    assert sign_offs_sort = assigns(:sign_offs)
    assert_equal sign_offs(:sign_two), sign_offs.first
    assert_equal sign_offs(:sign_five), sign_offs.last
  end

  test 'filter by date_to column' do
    xhr :get, :index, column_name: :date_to, filter_by: '12/11/2016'
    assert sign_offs = assigns(:sign_offs)
    sign_offs_expected = SignOff.where(date_to: '12/11/2016')
    assert_equal sign_offs_expected.sort, sign_offs.sort
    xhr :get, :index, column_name: :date_to, filter_by: '12/11/2016', sort: :date_from, direction: :desc
    assert sign_offs = assigns(:sign_offs)
    assert_equal sign_offs(:sign_two), sign_offs.first
    assert_equal sign_offs(:sign_five), sign_offs.second
  end

  test 'filter by sign off type name' do
    xhr :get, :index, column_name: :sign_off_type_name, filter_by: 'casual'
    assert sign_offs = assigns(:sign_offs)
    sign_offs_expected = SignOffType.find_by(sign_off_type_name: 'casual').sign_offs
    assert_equal sign_offs_expected.sort, sign_offs.sort
  end

  test 'pending requests count of user' do
    xhr :get, :pending_requests_count
    count = JSON.parse(response.body)
    assert_response 200, 'Successfully count pending requestes'
    assert_equal @user.pending_requests.count, count['pending_requests_count']
  end

  test 'create sign off with valid deatils' do
    sign_off_requester_count = SignOffRequester.count
    notification_count = Notification.count
    assert_difference('SignOff.count', 1) do
      xhr :post, :create, sign_off: { sign_off_type_id: sign_off_types(:one), half_full_leave: 'full', date_from: Date.today + 1, date_to: Date.today + 3, reason: 'this is the reason', requestee_ids: users(:two) }
    end
    sign_off_response = JSON.parse(response.body)
    assert_equal true, sign_off_response['success']
    assert_equal sign_off_requester_count + 1, SignOffRequester.count
    assert_equal notification_count + 1, Notification.count
    assert sign_off = assigns(:sign_off)
    assert_equal SignOff.last, assigns(:sign_off)
  end

  test 'sign off should not be created with invalid details' do
    sign_off_requester_count = SignOffRequester.count
    notification_count = Notification.count
    assert_no_difference 'SignOff.count' do
      xhr :post, :create, sign_off: { sign_off_type_id: sign_off_types(:one), half_full_leave: 'full', reason: 'this is the reason', requestee_ids: users(:two) }
    end
    sign_off_response = JSON.parse(response.body)
    assert_equal false, sign_off_response['success']
    assert_equal sign_off_requester_count, SignOffRequester.count
    assert_equal notification_count, Notification.count
    assert_match "can't be blank", sign_off_response['error']['date_from'].to_s
    assert_match "can't be blank", sign_off_response['error']['date_to'].to_s
  end

  test 'update sign off with valid details' do
    assert_match 'This is reason', @sign_offs.first.reason
    put :update, id: @sign_offs.first, user_id: @user, sign_off: { reason: 'suffering from fever' }
    assert sign_off = assigns(:sign_off)
    assert_match 'suffering from fever', sign_off.reason
    assert_equal @sign_offs.first, sign_off
    assert_redirected_to sign_offs_path
  end

  test 'show sign off details' do
    xhr :get, :show, id: @sign_offs.first
    assert assigns(:sign_off_data)
    assert sign_off = assigns(:sign_off)
    assert_equal @sign_offs.first, sign_off
    sign_off_response = JSON.parse(response.body)
    assert_match @user.name, sign_off_response['user_name']
    assert_match @sign_offs.first.requestee_name, sign_off_response['requestee_name']
  end

  test 'destroy sign off' do
    sign_off_count = SignOff.count
    delete :destroy, id: @sign_offs.first
    assert_equal sign_off_count - 1, SignOff.count
    assert sign_off = assigns(:sign_off)
    assert_equal @sign_offs.first, sign_off
    assert_redirected_to sign_offs_path
    assert_equal false, SignOff.all.include?(@sign_offs.first)
  end

  test 'change sign off status of user' do
    assert_match 'pending', @sign_offs.first.sign_off_status
    xhr :post, :change_sign_off_status, id: @sign_offs.first, sign_off: { status: 'approved', approved_rejected_by_id: users(:two)}
    assert sign_off = assigns(:sign_off)
    assert_match 'approved', sign_off.sign_off_status
    assert_equal @sign_offs.first, sign_off
    assert_equal users(:two).id, sign_off.approved_rejected_by_id
    status_response = JSON.parse(response.body)
    assert status_response['success']
  end

  test 'mark all notifications of user as read' do
    assert_equal 3, @user.notifications.count
    xhr :get, :mark_all_notifications_as_read
    assert notifications = assigns(:notifications)
    assert_equal 0, notifications.count
    assert_equal @user.notifications, notifications
  end

  test 'fetch new notifications' do
    assert_equal 3, @user.notifications.count
    xhr :get, :fetch_new_notifications
    notifications = JSON.parse(response.body)
    assert_equal 2, notifications['own_requests_notifications'].count
    assert_equal 1, notifications['others_requests_notifications'].count
    sign_off = SignOff.create(user: users(:two), date_from: Date.today + 2, date_to: Date.today + 4, reason: 'reason', sign_off_status: 'pending', half_full_leave: 'full', sign_off_type: sign_off_types(:one))
    SignOffRequester.create(user: users(:one), sign_off: sign_off)
    Notification.create(user: users(:one), sign_off: sign_off, notification_type: sign_off_types(:one).sign_off_type_name)
    xhr :get, :fetch_new_notifications
    notifications = JSON.parse(response.body)
    assert_equal 2, notifications['others_requests_notifications'].count
  end

  test 'pagination for sign offs' do
    xhr :get, :index, page: 1
    sign_offs = assigns(:sign_offs)
    sign_offs_expected = SignOff.page(1).per(Settings.pagination.default)
    assert_equal sign_offs_expected.sort, sign_offs
    Settings.pagination.default = 5
    xhr :get, :index, page: 1
    sign_offs = assigns(:sign_offs)
    sign_offs_expected = SignOff.page(1).per(Settings.pagination.default)
    assert_equal sign_offs_expected.sort, sign_offs
  end
end
