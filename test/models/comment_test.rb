require 'test_helper'

class CommentTest < ActiveSupport::TestCase

  def setup
    @comment = comments(:one)
  end

  test 'valid comment'  do
    assert @comment.valid?
  end

  test 'count errors' do
    @comment.sign_off_id = nil
    assert @comment.invalid?
    assert_equal 1, @comment.errors.count
  end
end
