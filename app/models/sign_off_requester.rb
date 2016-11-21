class SignOffRequester < ActiveRecord::Base
  belongs_to :sign_off
  belongs_to :user

  validates :sign_off_id, :user_id, presence: true
end
