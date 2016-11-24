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

  def mark_notification_as_read
    update_attribute(:read, true)
  end
end
