class Holiday < ActiveRecord::Base
  validates :date, presence: true

  def self.current_year_holidays
    select{|holiday| holiday.date.year == Time.zone.today.year}
  end
end
