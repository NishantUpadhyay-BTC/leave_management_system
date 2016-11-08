class User < ActiveRecord::Base
  require 'csv'
  require 'securerandom'
  # Include default devise modules. Others available are:
  #  :lockable, :timeoutable and :omniauthable

  devise :database_authenticatable, :registerable, :confirmable,
         :recoverable, :rememberable, :trackable, :validatable

  validates :name, :email, :designation, :gender, :date_of_joining, :date_of_birth, :role_id, presence: true

  has_many :leave_requesters
  has_many :sign_offs, :through => :leave_requesters
  has_many :comments
  belongs_to :role

  has_attached_file :avatar, styles: { medium: "300x300>", thumb: "100x100>" }, default_url: "/images/missing.gif"
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
        @user.role_id = row[6]
        @user.password = SecureRandom.hex(8)
        @user.save
      end
    end
  end
  
end


      
      