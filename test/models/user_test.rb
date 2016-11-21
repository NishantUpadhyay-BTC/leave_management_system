require 'test_helper'

class UserTest < ActiveSupport::TestCase
  def setup
    @user = users(:valid)
  end

  test "the truth" do
    assert true
  end

  test "valid user" do
    assert @user.valid?
  end

  test "password too short" do 
    @user.password = "12345"
    assert @user.invalid?
    assert_match 'Password is too short', @user.errors.full_messages.first
  end

  test "email not valid" do 
    @user.email = "@johndoe"
    assert @user.invalid?
    assert_match 'Email is invalid', @user.errors.full_messages.first
  end

  test "role must present" do
    @user.role_id = nil
    assert @user.invalid?
    assert_match "Role can't be blank", @user.errors.full_messages.first
  end

  test "count errors" do
    @user.date_of_joining = "11/07"
    @user.email = "@johndoe" 
    @user.role_id = nil
    assert @user.invalid?
    assert_equal 3, @user.errors.count
  end

  test "user comments" do
    assert_equal 2, @user.comments.size
  end

  test "user leaves" do
    assert_equal 2, @user.sign_offs.size
  end

end