class SignOff < ActiveRecord::Base
  has_many :leave_requesters
  has_many :users, :through => :leave_requesters
  belongs_to :leave_type
  has_many :comments

  validates :user_id, :leave_type_id, :date_from, :date_to, :half_full_leave, presence: true

  enum leave_status: { pending: 0, approved: 1 }
  enum half_full_leave: { half: 0, full: 1 }
end