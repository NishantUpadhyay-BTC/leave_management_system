class Comment < ActiveRecord::Base
  belongs_to :sign_off
  belongs_to :user

  validates :sign_off_id, :user_id, :message, presence: true
end
