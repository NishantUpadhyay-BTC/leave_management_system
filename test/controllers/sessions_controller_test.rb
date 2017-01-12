require 'test_helper'

class SessionsControllerTest < ActionController::TestCase
  include Devise::Test::ControllerHelpers

  setup do
    @user = create(:user)
    @request.env['devise.mapping'] = Devise.mappings[:user]
  end

  test 'create session with authorized user' do
    xhr :post, :create, user: { email: @user.email, password: @user.password, fcm_token: SecureRandom.hex(10) }
    assert_response 200, 'Successfully session created'
    session_response = JSON.parse(response.body)
    assert_equal true, session_response['success']
    assert session.present?
  end

  test 'should not create session with unauthorized user' do
    xhr :post, :create, user: { email: @user.email }
    session_response = JSON.parse(response.body)
    assert_response 401, 'Unauthorized user error'
    assert_equal false, session_response['success']
    assert_match 'Error with your login or password', session_response['message']
    assert_equal false, session.present?
  end

  test 'destroy session of authorized user' do
    xhr :delete, :destroy
    assert_response 200, 'Successfully destroyed'
    assert_equal false, session.present?
  end
end
