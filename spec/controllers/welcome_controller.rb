require "rails_helper"

RSpec.describe WelcomeController, :type => :controller do
  it "Responds Successfully" do
    get :index
    expect(response.status).to eq(200)
  end
end