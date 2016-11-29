class User < ActiveRecord::Base
  require 'csv'
  require 'securerandom'
  # Include default devise modules. Others available are:
  #  :lockable, :timeoutable and :omniauthable
  REQUEST_APPROVAL_TYPES = [:pending, :rejected, :approved]
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  validates :name, :email, :designation, :gender, :date_of_joining, :date_of_birth, presence: true

  before_create :generate_access_token

  has_many :sign_off_requesters
  has_many :sign_offs
  has_many :comments
  has_many :roles
  has_one :profile
  has_many :notifications

  scope :with_role, -> (role) { joins(:role).where(roles: {name: role}) }

  has_attached_file :avatar, styles: { medium: "300x300>", thumb: "100x100>", small: "50x50>" }, default_url: "/images/missing.gif"
  validates_attachment_content_type :avatar, content_type: /\Aimage\/.*\z/

  def self.import_user(file)
    CSV.foreach(file.path) do |row|
      next if row[0] == "email" || row[0].nil?
      ActiveRecord::Base.transaction do
        @user = User.new
        @user.email = row[0]
        @user.name = row[1]
        @user.designation = row[2]
        @user.gender = row[3]
        @user.date_of_joining = row[4]
        @user.date_of_birth = row[5]
        @role = Role.find_by_name(row[6])
        @user.password = SecureRandom.hex(8)
        @user.save
      end
    end
  end

  REQUEST_APPROVAL_TYPES.each do |status|
    define_method("#{status}_requests") do |*args|
      selected_sign_offs = sign_offs.where(sign_off_status: status).includes(:sign_off_type)
      prepare_leave_data_as_json(selected_sign_offs) if selected_sign_offs.present?
    end
  end

  def create_token
    access_token.present? ? access_token : SecureRandom.hex
  end

  def generate_access_token
    begin
      self.access_token = SecureRandom.hex
    end while self.class.exists?(access_token: access_token)
  end

  def request_for_approval
    leaves = sign_off_requesters.includes(sign_off: [:sign_off_type, :user]).map(&:sign_off)
    prepare_leave_data_as_json(leaves) if leaves.compact.present?
  end

  def total_approved_request_count_till_now
    totoal_approved_requests = sign_offs.where(sign_off_status: 'approved').includes(:sign_off_type).where("date_from < ? ", Time.zone.today)
    totoal_approved_requests.present? ? totoal_approved_requests.map{|req| req.date_to - req.date_from}.inject(0){|sum,x| sum + x }.to_i : 0
  end

  def leave_balance
    15 - total_approved_request_count_till_now
  end

  def new_notifications_of_approval
    sign_offs.where(sign_off_status: 'approved')
  end

  def is_admin?
    roles.pluck(:name).include?('admin')
  end

  def leave_counts
    approved_requests_count = approved_requests.present? ? approved_requests.count : 0
    rejected_requests_count = rejected_requests.present? ? rejected_requests.count : 0
    pending_requests_count = pending_requests.present? ? pending_requests.count : 0
    {
      remaingin_leaves: leave_balance,
      laves_taken: total_approved_request_count_till_now,
      pending_request_counts: pending_requests_count,
      approved_request_counts: approved_requests_count,
      rejected_request_counts: rejected_requests_count
    }
  end

  def own_requests_notifications
     new_own_notifications = notifications.includes(sign_off: :sign_off_type).where("sign_offs.user_id" => id)
     prepare_leave_data_as_json(new_own_notifications) if new_own_notifications.present?
  end

  def others_requests_notifications
    new_other_notifications = notifications.includes(sign_off: :sign_off_type, sign_off: :user).where.not("sign_offs.user_id" => id)
    prepare_leave_data_as_json(new_other_notifications) if new_other_notifications.present?
  end

  def prepare_leave_data_as_json(leaves)
    prepared_leaves = []
    leaves.each do |leave|
      leave_request = leave.kind_of?(Notification) ? leave.sign_off : leave
      leave_json = leave_request.as_json
      leave_json['notification_id'] = leave.id if leave.kind_of?(Notification)
      leave_json['username'] = leave_request.user.name if leave_request.present? && leave_request.user.present?
      leave_json['leave_type'] = leave_request.sign_off_type.sign_off_type_name if leave_request.present? && leave_request.sign_off_type.present?
      prepared_leaves << leave_json
    end
    prepared_leaves.compact
  end
end
