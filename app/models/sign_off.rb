class SignOff < ActiveRecord::Base
  has_many :sign_off_requesters
  has_many :users, :through => :sign_off_requesters
  belongs_to :sign_off_type
  has_many :comments
  belongs_to :user
  validates :user_id, :sign_off_type_id, :date_from, :date_to, :half_full_leave, presence: true

  enum sign_off_status: { pending: 0, approved: 1, rejected: 2 }
  enum half_full_leave: { half: 0, full: 1 }
end