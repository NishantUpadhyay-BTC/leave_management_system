class SignOff < ActiveRecord::Base
  has_many :sign_off_requesters
  has_many :users, :through => :sign_off_requesters
  belongs_to :sign_off_type
  has_many :comments

  validates :user_id, :leave_type_id, :date_from, :date_to, :half_full_leave, presence: true

  enum leave_status: { pending: 0, approved: 1 }
  enum half_full_leave: { half: 0, full: 1 }
  enum leave_type: { 'Casual Leave': 0, 'Sick Leave': 1, 'Privilege Leave': 2 }  
end
