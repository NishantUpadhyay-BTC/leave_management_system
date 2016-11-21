require 'test_helper'

class SignOffTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
  def setup
    @sign_off = sign_offs(:sign_one)
  end

  test "valid sign off" do
    assert @sign_off.valid?
  end

  test "invalid sign off" do 
    @sign_off.leave_type_id = nil
    @sign_off.date_from = nil
    @sign_off.date_to = nil
    assert @sign_off.invalid?
    assert_equal 3, @sign_off.errors.count
  end

  test "half full leave can't be blank" do
    @sign_off.half_full_leave = nil
    assert @sign_off.invalid?
    assert_match "Half full leave can't be blank", @sign_off.errors.full_messages.first
  end

  test "sign off requester usesrs" do
    assert_equal 2, @sign_off.users.size
  end

  test "sign off comments" do
    assert_equal 3, @sign_off.comments.size
  end
end
