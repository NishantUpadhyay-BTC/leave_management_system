class LeaveRequester < ActiveRecord::Base
  belongs_to :leave
  belongs_to :user
end
