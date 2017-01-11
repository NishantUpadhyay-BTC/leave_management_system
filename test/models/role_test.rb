require 'test_helper'

class RoleTest < ActiveSupport::TestCase

  def setup
    @role = create(:role)
  end

  test "valid user role" do
    assert @role.valid?
  end

  test "role name can't be blank" do
    @role.name = nil
    assert @role.invalid?
    assert_match "Name can't be blank", @role.errors.full_messages.first
  end
end
