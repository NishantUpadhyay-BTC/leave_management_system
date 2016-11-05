class HomeController < ApplicationController
  def index
    @hello_world_props = { name: "Stranger" }
  end

  def login
    render layout: "login_layout"
  end
end
