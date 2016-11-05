class HomeController < ApplicationController
  def index
  end

  def login
    render layout: "login_layout"
  end
end
