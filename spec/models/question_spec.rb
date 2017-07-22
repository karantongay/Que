require 'rails_helper'

RSpec.describe Question, :type => :model do

  subject = Question.new(title: "test1", contents: "test1", askedby: "test")

  it "is valid with valid attributes" do
    expect(subject).to be_valid
  end

  it "is not valid without a title" do
    subject.title = nil
    expect(subject).to_not be_valid
  end

  it "is not valid without contents" do
    subject.contents = nil
    expect(subject).not_to be_valid
  end

  it "is not valid without askedby" do
    subject.askedby = nil
    expect(subject).not_to be_valid
  end

  it "may have many answers" do
    assc = Question.reflect_on_association(:answers)
    expect(assc.macro).to eq :has_many
  end

end