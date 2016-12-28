require 'test_helper'

class SignOffsControllerTest < ActionController::TestCase
  include Devise::Test::ControllerHelpers

  setup do
    @sign_offs = sign_offs(:sign_one, :sign_two, :sign_three)
    @user = users(:one)
    sign_in @user
  end

  test 'index for all' do
    xhr :get, :index
    assert_response 200
  end

  test 'searching for sign off status' do
    get :search, search: 'pending'
    assert assigns(:sign_offs)
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
end
