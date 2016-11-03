class Comment < ActiveRecord::Base
  belongs_to :leave
  belongs_to :user

  validates :leave_id, :user_id, :sender_id, :receiver_id, :description, presence: true
end
