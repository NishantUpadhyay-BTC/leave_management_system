require 'test_helper'

class CommentTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
  def setup
    @comment = comments(:one)
  end

  test "valid comment"  do
    assert @comment.valid?
  end

  test "count errors" do 
    @comment.sign_off_id = nil
    @comment.description = nil
    assert @comment.invalid?
    assert_equal 2, @comment.errors.count
  end
  
end
