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

  def approved_or_rejected_by
    approved_rejected_by_id.present? ? User.find(approved_rejected_by_id).name.titleize : ''
  end

  def comments_with_user_data
    commets_with_users = comments.includes(:user)
    final_comments = []
    if commets_with_users.present?
      commets_with_users.each do |comment|
        comment_obj={}
        comment_obj[:_id] = comment.id
        comment_obj[:text] = comment.message
        comment_obj[:createdAt] = comment.created_at
        comment_obj[:user]= comments_user(comment)
        final_comments << comment_obj
      end
    end
    final_comments
  end

  def comments_user(comment)
    user={}
    user[:_id] = comment.user.id
    user[:name] = comment.user.name
    user
  end

  def requestee_name
    sign_off_requesters.map{|s| s.user.name }.join(', ').titleize
  end
end
