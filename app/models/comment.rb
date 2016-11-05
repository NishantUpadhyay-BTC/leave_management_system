class Comment < ActiveRecord::Base
  belongs_to :sign_off
  belongs_to :user
  
  validates :sign_off_id, :user_id, :sender_id, :receiver_id, :description, presence: true
end
