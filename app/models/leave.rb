class Leave < ActiveRecord::Base
    belongs_to :leave_type
    has_many :leave_requesters
    has_many :users, :through => :leave_requesters
    has_many :comments

    validates :user_id, :leave_type_id, :date_from, :date_to, :leave_days, :reason, :half_full_leave, :leave_status, presence: true

end
