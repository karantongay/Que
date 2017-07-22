#Contains the specification of the landing page of the application
class WelcomeController < ApplicationController
  def index
    render :layout => false
  end
end