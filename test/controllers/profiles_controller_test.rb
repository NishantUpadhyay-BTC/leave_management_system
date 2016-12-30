require 'test_helper'

class ProfilesControllerTest < ActionController::TestCase
  include Devise::Test::ControllerHelpers

  setup do
    @user = users(:one)
    sign_in @user
  end

  test 'profile show for employee' do
    xhr :get, :show, id: @user.profile
    assert_equal @user.profile, assigns(:profile)
    profile_response = JSON.parse(response.body)
    assert_equal 12, profile_response['leave_counts']['remaingin_leaves']
    assert_equal @user.name, profile_response['user']['name']
  end

  test 'profile show for employee with another user' do
    xhr :get, :show, id: users(:two).profile
    profile_response = JSON.parse(response.body)
    assert_response 401
    assert_equal false, profile_response['success']
    assert_equal "Sorry, But you can't access other user's profile.", profile_response['errors']
  end

  test 'profile show for admin' do
    @user.roles.destroy_all
    @user.roles << roles(:admin)
    xhr :get, :show, id: users(:two).profile
    assert_equal users(:two).profile, assigns(:profile)
    profile_response = JSON.parse(response.body)
    assert_equal 12, profile_response['leave_counts']['remaingin_leaves']
    assert_equal users(:two).name, profile_response['user']['name']
  end
end
