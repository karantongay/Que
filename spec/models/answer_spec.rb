require 'rails_helper'

RSpec.describe Answer, :type => :model do

  subject = Answer.new(question_id: 1, contents: "length of 5")

  it "is valid with all attributes" do
    expect(subject).to be_valid
  end

  it "is not valid without contents" do
    subject.contents = nil
    expect(subject).not_to be_valid
  end

  it "is not valid with contents of length less than 5" do
    subject.contents = "<5"
    expect(subject).not_to be_valid
  end

  it "is not valid without a question" do
    subject.question_id = nil
    expect(subject).not_to be_valid
  end

  it "belongs to one question" do
    assc = Answer.reflect_on_association(:question)
      expect(assc.macro).to eq :belongs_to
  end
end