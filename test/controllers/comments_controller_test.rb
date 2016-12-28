require 'test_helper'

class CommentsControllerTest < ActionController::TestCase

  setup do
    @sign_off = sign_offs(:sign_one)
  end

  test 'create comment' do
    assert_difference('@sign_off.comments.count', 1) do
      xhr :post, :create, sign_off_id: @sign_off, comment: { message: 'o hello' }
    end
    comment_response = JSON.parse(response.body)
    assert_equal true, comment_response['success']
  end

  test 'should not create comment' do
    assert_no_difference('@sign_off.comments.count') do
      xhr :post, :create, sign_off_id: @sign_off, comment: { message: '' }
    end
    comment_response = JSON.parse(response.body)
    assert_equal false, comment_response['success']
  end
end
