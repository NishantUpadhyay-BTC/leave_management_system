class SignOff < ActiveRecord::Base
  has_many :sign_off_requesters
  has_many :users, :through => :sign_off_requesters
  belongs_to :sign_off_type
  has_many :comments
  belongs_to :user
  has_many :notifications, dependent: :destroy
  validates :user_id, :sign_off_type, :date_from, :date_to, :half_full_leave, presence: true

  scope :requested_sign_off, -> (user_id){ SignOff.joins(:sign_off_requesters).where({sign_off_requesters: {user_id: user_id}}) }

  def leave_days
    (date_to - date_from).to_i + 1
  end

  def mark_notification_as_read(user)
    notification = notifications.find_by_user_id(user.id)
    if notification.present?
      begin
        notification.destroy
      rescue Exception => e
        logger.debug("ERROR : Notification Removeal Failure :: #{e}")
      end
    end
  end

  def comments_with_user_data
    commets_with_users = comments.includes(:user)
    final_comments = []
    if commets_with_users.present?
      commets_with_users.each do |comment|
        comment_obj = comment.as_json
        comment_obj[:user_name] = comment.user.name
        final_comments << comment_obj
      end
    end
    final_comments
  end
end
