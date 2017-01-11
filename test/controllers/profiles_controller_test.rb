require 'test_helper'

class ProfilesControllerTest < ActionController::TestCase
  include Devise::Test::ControllerHelpers

  setup do
    @user = create(:user_with_sign_off)
    @user_other = User.last
    sign_in @user
  end

  test 'employee show own profile' do
    xhr :get, :show, id: @user.id, access_token: @user.access_token
    assert_equal @user.profile, assigns(:profile)
    profile_response = JSON.parse(response.body)
    assert_equal 9, profile_response['leave_counts']['remaingin_leaves']
    assert_equal @user.name, profile_response['user']['name']
  end

  test 'employee cannot show another employee profile' do
    xhr :get, :show, id: @user_other.id, access_token: @user.access_token
    profile_response = JSON.parse(response.body)
    assert_response 401, 'Unauthorized user'
    assert_equal false, profile_response['success']
    assert_match "Sorry, But you can't access other user's profile.", profile_response['errors']
  end

  test 'admin can show employee profile' do
    @user.roles.destroy_all
    @user.roles << create(:role)
    xhr :get, :show, id: @user_other.id, access_token: @user.access_token
    assert_equal @user_other.profile, assigns(:profile)
    profile_response = JSON.parse(response.body)
    assert_equal 12, profile_response['leave_counts']['remaingin_leaves']
    assert_match @user_other.name, profile_response['user']['name']
  end
end
