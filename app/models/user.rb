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
      sign_offs.where(sign_off_status: status)
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
    sign_off_requesters.includes(:sign_off).map(&:sign_off)
  end

  def total_approved_request_count_till_now
    approved_requests.where("date_from < ? ", Time.zone.today).map{|req| req.date_to - req.date_from}.inject(0){|sum,x| sum + x }.to_i
  end

  def leave_balance
    15 - total_approved_request_count_till_now
  end
end
