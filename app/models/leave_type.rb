class LeaveType < ActiveRecord::Base
  has_many :leaves

  validates :leave_type_name, :no_of_days, presence: true
end
