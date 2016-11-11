class SignOffType < ActiveRecord::Base
  has_many :sign_offs

  validates :sign_off_type_name, :no_of_days, presence: true
end
