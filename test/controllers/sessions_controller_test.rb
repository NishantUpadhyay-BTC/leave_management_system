require 'test_helper'

class SessionsControllerTest < ActionController::TestCase
  include Devise::Test::ControllerHelpers

  setup do
    @user = users(:one)
    @request.env['devise.mapping'] = Devise.mappings[:user]
  end

  test 'create session' do
    xhr :post, :create, user: { email: @user.email, password: 'john@123', fcm_token: SecureRandom.hex(10) }
    assert_response 200
    session_response = JSON.parse(response.body)
    assert_equal true, session_response['success']
  end

  test 'should not create session' do
    xhr :post, :create, user: { email: @user.email }
    session_response = JSON.parse(response.body)
    assert_response 401
    assert_equal false, session_response['success']
    assert_equal 'Error with your login or password', session_response['message']
  end

  test 'destroy session' do
    xhr :delete, :destroy
    assert_response 200
    assert_equal false, session.any?
  end
end
