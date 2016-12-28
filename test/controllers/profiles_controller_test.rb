require 'test_helper'

class ProfilesControllerTest < ActionController::TestCase
  include Devise::Test::ControllerHelpers

  test 'profile show for employee' do
    user = users(:one)
    sign_in user
    xhr :get, :show, id: user.profile
    assert_equal user.profile, assigns(:profile)
  end

  # test 'profile show for admin' do
  #   user = users(:two)
  #   sign_in user
  #   xhr :get, :show, id: user.profile
  # end
end
