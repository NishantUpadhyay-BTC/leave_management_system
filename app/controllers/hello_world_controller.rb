class HelloWorldController < ApplicationController
  def login
    render layout: "login_layout"
  end
  
  def index
    @hello_world_props = { name: "Stranger" }
  end
end
