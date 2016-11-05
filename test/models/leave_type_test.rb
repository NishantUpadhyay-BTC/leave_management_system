require 'test_helper'

class LeaveTypeTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
  def setup
    @leave_type = leave_types(:sick)
  end

  test "valid leave type" do
    assert @leave_type.valid?
  end

  test "leave type name can't be blank" do
    @leave_type.leave_type_name = nil
    assert @leave_type.invalid?
    assert_match "Leave type name can't be blank", @leave_type.errors.full_messages.first
  end

  test "leave type sign offs count"  do
    assert_equal 2, @leave_type.sign_offs.size
  end

end
