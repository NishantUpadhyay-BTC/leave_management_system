require 'test_helper'

class UserTest < ActiveSupport::TestCase
  def setup
    @user = users(:one)
  end

  test 'valid user' do
    assert @user.valid?
  end

  test 'password too short' do 
    @user.password = '12345'
    assert @user.invalid?
    assert_match 'Password is too short', @user.errors.full_messages.first
  end

  test 'email not valid' do 
    @user.email = '@johndoe'
    assert @user.invalid?
    assert_match 'Email is invalid', @user.errors.full_messages.first
  end

  test 'user comments' do
    assert_equal 3, @user.comments.size
  end

  test 'user leaves' do
    assert_equal 4, @user.sign_offs.size
  end

  test 'request for approval' do
    request_for_approval = @user.request_for_approval
    assert_equal @user.sign_off_requesters.count, request_for_approval.count
  end

  test 'leave counts' do
    leave_counts = @user.leave_counts
    assert_equal 12, leave_counts[:remaingin_leaves]
    assert_equal 2, leave_counts[:laves_taken]
    assert_equal 2, leave_counts[:pending_request_counts]
    assert_equal 1, leave_counts[:approved_request_counts]
    assert_equal 1, leave_counts[:rejected_request_counts]
  end

  test 'is admin' do
    assert users(:two).is_admin?
  end

  test 'total approved request count till now' do
    total_approved_request_count_till_now = @user.total_approved_request_count_till_now
    assert_equal 2, total_approved_request_count_till_now
  end

  test 'leave balance' do
    leave_balance = @user.leave_balance
    assert_equal 13, leave_balance  
  end

  test 'new notifications of approval' do
    new_notifications_of_approval = @user.new_notifications_of_approval
    sign_offs = @user.sign_offs.where(sign_off_status: 'approved')
    assert_equal sign_offs, new_notifications_of_approval
  end

  test 'own requests notifications' do
    own_requests_notifications = @user.own_requests_notifications
    assert_equal 2, own_requests_notifications.count
  end

  test 'other requests notifications' do
    other_requests_notifications = @user.others_requests_notifications
    assert_equal 1, other_requests_notifications.count
  end
end
