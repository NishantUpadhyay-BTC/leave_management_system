require 'test_helper'

class CommentTest < ActiveSupport::TestCase

  def setup
    @comment = FactoryGirl.create(:user_with_sign_off).sign_offs.first.comments.first
  end

  test 'valid comment' do
    assert @comment.valid?
  end

  test 'count errors for creating comment' do
    @comment.sign_off_id = nil
    assert @comment.invalid?
    assert_equal 1, @comment.errors.count
  end
end
