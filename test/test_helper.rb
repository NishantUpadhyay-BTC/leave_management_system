ENV['RAILS_ENV'] ||= 'test'
require File.expand_path('../../config/environment', __FILE__)
require 'rails/test_help'

class ActiveSupport::TestCase
  # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
  include FactoryGirl::Syntax::Methods

  fixtures :all

  # Add more helper methods to be used by all tests here...
  def create_sign_off(user)
    SignOff.destroy_all
    date = Date.parse('1/11/2016')
    3.times do
      create(:sign_off, sign_off_type: create(:sign_off_type), date_from: date, user: user )
      date += 1
      create(:sign_off, sign_off_type: create(:sign_off_type, :casual), date_from: date, user: user )
      date += 1
    end
  end
end
