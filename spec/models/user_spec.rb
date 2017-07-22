require 'rails_helper'

RSpec.describe User, :type => :model do

  it "has one profile" do
    assc = User.reflect_on_association(:profile)
    expect(assc.macro).to eq :has_one
  end

end