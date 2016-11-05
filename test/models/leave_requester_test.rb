require 'test_helper'

class LeaveRequesterTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end

  def setup
    @leave_requester = leave_requesters(:one)
  end

  test "valid leave type" do
    assert @leave_requester.valid?
  end

end
