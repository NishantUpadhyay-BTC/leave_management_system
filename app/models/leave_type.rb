class LeaveType < ActiveRecord::Base
  has_many :sign_offs

  validates :leave_type_name, :no_of_days, presence: true

  enum leave_type: { 'Casual Leave': 0, 'Sick Leave': 1, 'Privilege Leave': 2 }
end