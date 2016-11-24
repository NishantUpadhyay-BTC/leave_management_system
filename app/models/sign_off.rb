class SignOff < ActiveRecord::Base
  has_many :sign_off_requesters
  has_many :users, :through => :sign_off_requesters
  belongs_to :sign_off_type
  has_many :comments
  belongs_to :user
  validates :user_id, :sign_off_type, :date_from, :date_to, :half_full_leave, presence: true

  scope :requested_sign_off, -> (user_id){ SignOff.joins(:sign_off_requesters).where({sign_off_requesters: {user_id: user_id}}) }

  def leave_days
    (date_to - date_from).to_i + 1
  end

  def total_working_days_of_current_month
    (start_date_of_current_month..end_date_of_current_month).to_a.select {|k| my_days.include?(k.wday)}.count
  end

  private

  def start_date_of_current_month
    Date.new(Date.today.year, Date.today.month)
  end

  def end_date_of_current_month
    start_date_of_current_month.end_of_month
  end

  def weekdays_index
    [1,2,3,4,5] # Start with 0 as sunday and 6 as saturday
  end
end
