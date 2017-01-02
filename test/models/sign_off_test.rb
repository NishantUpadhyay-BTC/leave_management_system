require 'test_helper'

class SignOffTest < ActiveSupport::TestCase
  setup do
    @sign_off = sign_offs(:sign_one)
  end

  test 'valid sign off' do
    assert @sign_off.valid?
  end

  test 'invalid sign off' do
    @sign_off.sign_off_type_id = nil
    @sign_off.date_from = nil
    assert @sign_off.invalid?
    assert_match "can't be blank", @sign_off.errors.messages[:sign_off_type].first
    assert_match "can't be blank", @sign_off.errors.messages[:date_from].first
  end

  test 'half full leave can not be blank' do
    @sign_off.half_full_leave = nil
    assert @sign_off.invalid?
    assert_match "Half full leave can't be blank", @sign_off.errors.full_messages.first
  end

  test 'sign off comments' do
    assert_equal 1, @sign_off.comments.size
  end

  test 'leave days of sign off' do
    assert_equal 3, @sign_off.leave_days
  end

  test 'mark notification as read' do
    assert_not_empty @sign_off.notifications
    @sign_off.mark_notification_as_read(users(:one))
    assert_empty @sign_off.notifications
  end

  test 'sign off approved or rejected by' do
    assert_match 'Came', sign_offs(:sign_four).approved_or_rejected_by
  end

  test 'comments with user data' do
    sign_off_comments = @sign_off.comments_with_user_data
    assert_equal @sign_off.comments.count, sign_off_comments.count
    assert_equal @sign_off.comments.first.id, sign_off_comments[0][:_id]
    assert_equal @sign_off.comments.first.user_id, sign_off_comments[0][:user][:_id]
  end

  test 'comments user of sign_off' do
    comments_user = @sign_off.comments_user(@sign_off.comments.first)
    assert_equal @sign_off.comments.first.user_id, comments_user[:_id]
  end

  test 'sign off requestee name' do
    assert_match 'John, Came', @sign_off.requestee_name
  end
end
