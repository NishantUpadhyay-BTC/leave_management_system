require 'test_helper'

class HolidayTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
  def setup
    @holiday = holidays(:holiday)
  end

  test "valid holiday" do
    assert @holiday.valid?
  end

  test "date can't be blank" do
    @holiday.date = nil
    assert @holiday.invalid?
    assert_match "Date can't be blank", @holiday.errors.full_messages.first
  end

end
