require "rails_helper"
require "capybara/rspec"


RSpec.describe QuestionsController, :type => :controller do

  describe "GET index" do
  it "is valid when Responds Successfully" do
    expect(response.status).to eq(200)
      end
  end
  describe "GET show" do
    it "Shows a list of questions" do
      visit "/questions"
      expect(response.status).to eq(200)
    end
  end
  describe "#create" do
    it "creates a question successfully" do
      @question = Question.create(title:"Test",contents: "Test",askedby: "Test")
      expect(@question).to be_an_instance_of Question
      end
    end

    describe "new" do
      it "Creates an instance of Question model" do
        @question = Question.new
      expect(@question).to be_an_instance_of Question
      end
    end
end