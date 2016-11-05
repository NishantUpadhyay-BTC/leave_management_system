class LeaveType < ActiveRecord::Base
  has_many :sign_offs

  validates :leave_type_name, :no_of_days, presence: true
end
