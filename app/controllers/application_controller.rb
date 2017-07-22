#The main controller of the application
class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  layout :layout_by_resource
  skip_before_action :verify_authenticity_token


  private

  def layout_by_resource
    if devise_controller?
      "formlayout"
    else
      "application"
    end
  end

end