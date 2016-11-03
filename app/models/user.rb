class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  validates :name, :email, :designation, :gender, :date_of_joining, :date_of_birth, :role_id, presence: true

  has_many :leave_requesters
  has_many :leaves, :through => :leave_requesters
  has_many :comments

end
