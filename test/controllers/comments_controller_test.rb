require 'test_helper'

class CommentsControllerTest < ActionController::TestCase

  setup do
    @user = create(:user_with_sign_off)
    @sign_off = @user.sign_offs.first
  end

  test 'create comment of signoff with valid details' do
    assert_difference('@sign_off.comments.count', 1) do
      xhr :post, :create, sign_off_id: @sign_off, comment: { message: 'o hello' }, access_token: @user.access_token
    end
    comment_response = JSON.parse(response.body)
    assert_equal true, comment_response['success']
    assert sign_off = assigns(:sign_off)
    assert_equal @sign_off, sign_off
    assert comment = assigns(:comment)
    assert_equal Comment.last, comment
  end

  test 'should not be created comment with blank message' do
    assert_no_difference('@sign_off.comments.count') do
      xhr :post, :create, sign_off_id: @sign_off, comment: { message: '' }, access_token: @user.access_token
    end
    comment_response = JSON.parse(response.body)
    assert_equal false, comment_response['success']
    assert_match "can't be blank", comment_response['errors']['message'].to_s
  end
end
