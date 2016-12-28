require 'test_helper'

class SignOffTypesControllerTest < ActionController::TestCase

  setup do
    @sign_off_type = sign_off_types(:one)
  end

  test 'sign off type index' do
    xhr :get, :index
    assert_response 200
    assert_equal SignOffType.count, assigns(:sign_off_types).count
  end

  test 'sign off type create' do
    assert_difference('SignOffType.count', 1) do
      xhr :post, :create, sign_off_type: { sign_off_type_name: 'optional', no_of_days: 4, description: 'additional'}
    end
    sign_off_type_response = JSON.parse(response.body)
    assert_equal true, sign_off_type_response['success']
  end

  test 'sign off type should not create' do
    assert_no_difference 'SignOffType.count' do
      xhr :post, :create, sign_off_type: { sign_off_type_name: 'optional'}
    end
    sign_off_type_response = JSON.parse(response.body)
    assert_equal false, sign_off_type_response['success']
  end

  test 'sign off type update' do
    put :update, id: @sign_off_type, sign_off_type: {no_of_days: 5}
    assert_redirected_to sign_off_types_path
  end

  test 'sign off type destroy' do
    assert_difference('SignOffType.count', -1) do
      xhr :delete, :destroy, id: @sign_off_type
    end
    sign_off_type_response = JSON.parse(response.body)
    assert_equal true, sign_off_type_response['success']
  end
end
