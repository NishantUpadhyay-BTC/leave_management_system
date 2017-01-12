require 'test_helper'

class HolidayTest < ActiveSupport::TestCase

  def setup
    @holiday = FactoryGirl.create(:holiday)
  end

  test 'valid holiday' do
    assert @holiday.valid?
  end

  test 'date can not be blank' do
    @holiday.date = nil
    assert @holiday.invalid?
    assert_match "Date can't be blank", @holiday.errors.full_messages.first
  end
end
