require 'test_helper'

class SignOffTypesControllerTest < ActionController::TestCase

  setup do
    @sign_off_type = sign_off_types(:one)
  end

  test 'show all sign off types' do
    xhr :get, :index
    assert_response 200, 'success'
    assert sign_off_types = assigns(:sign_off_types)
    assert_equal SignOffType.count, sign_off_types.count
    assert_equal SignOffType.all.sort, sign_off_types.sort
  end

  test 'sort columns of sign off types' do
    xhr :get, :index, sort: :sign_off_type_name, direction: :acs
    assert sign_off_type = assigns(:sign_off_types)
    assert_equal sign_off_types(:two), sign_off_type.first
    xhr :get, :index, sort: :no_of_days, direction: :decs
    assert sign_off_type = assigns(:sign_off_types)
    assert_equal sign_off_types(:two), sign_off_type.first
  end

  test 'sign off type create with valid details' do
    assert_difference('SignOffType.count', 1) do
      xhr :post, :create, sign_off_type: { sign_off_type_name: 'optional', no_of_days: 4, description: 'additional'}
    end
    sign_off_type_response = JSON.parse(response.body)
    assert_equal true, sign_off_type_response['success']
    assert sign_off_type = assigns(:sign_off_type)
    assert_equal SignOffType.last, sign_off_type
  end

  test 'sign off type should not be created with invalid details' do
    assert_no_difference 'SignOffType.count' do
      xhr :post, :create, sign_off_type: { sign_off_type_name: 'optional'}
    end
    sign_off_type_response = JSON.parse(response.body)
    assert_equal false, sign_off_type_response['success']
    assert_match "can't be blank", sign_off_type_response['errors']['no_of_days'].to_s
  end

  test 'sign off type updated with valid detail' do
    assert_equal 5, @sign_off_type.no_of_days
    put :update, id: @sign_off_type, sign_off_type: {no_of_days: 6}
    assert sign_off_type = assigns(:sign_off_type)
    assert_equal 6, sign_off_type.no_of_days
    assert_equal @sign_off_type, sign_off_type
    assert_redirected_to sign_off_types_path
  end

  test 'sign off type destroy' do
    assert_difference('SignOffType.count', -1) do
      xhr :delete, :destroy, id: @sign_off_type
    end
    sign_off_type_response = JSON.parse(response.body)
    assert_equal true, sign_off_type_response['success']
    assert_equal @sign_off_type.id, sign_off_type_response['leave_type_id'].to_i
    assert sign_off_type = assigns(:sign_off_type)
    assert_equal @sign_off_type, sign_off_type
    assert_equal false, SignOffType.all.include?(@sign_off_type)
  end
end
