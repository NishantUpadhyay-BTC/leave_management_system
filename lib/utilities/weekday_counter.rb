module Utilites
  module WeekdayCounter
    WEEKDAYS_INDEX = [1,2,3,4,5] # Start with 0 as sunday and 6 as saturday

    def this_month_total_weekdays
      (start_date_of_current_month..end_date_of_current_month).to_a.select {|k| WEEKDAYS_INDEX.include?(k.wday)}.count
    end

    def this_month_total_working_days
      this_month_total_weekdays - current_month_public_holidays
    end

    private

    def current_month_public_holidays
      Holiday.select{|holiday| holiday.date.month == Date.today.month}.count
    end

    def start_date_of_current_month
      Date.new(Date.today.year, Date.today.month)
    end

    def end_date_of_current_month
      start_date_of_current_month.end_of_month
    end
  end
end
