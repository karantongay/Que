# The root controller of the application through
# which all the routes frontend (Backbone) are handled
class AppController < ApplicationController

  before_action :authenticate_user!

  def index

  end

# Controllers for Profiles View #

def user

  @question = Question.where(askedby: current_user.email)
  @answer = Answer.where(answeredby: current_user.email)
  respond_to do |format|
  format.html # index.html.erb
  format.json{render :json =>[current_user.email,@question.count,@answer.count]}
  end
end

def follows

  @followers1 = current_user.followers
  @following1 = current_user.all_following
  respond_to do |format|
  format.html # index.html.erb
  format.json { render :json => [@followers1, @following1] }
  end
end

def questions

  @question = Question.where(askedby: current_user.email)
  respond_to do |format|
  format.html # index.html.erb
  format.json { render :json => [@question] }
  end

end

def answers

  ans = []
  @answer = Answer.where(answeredby: current_user.email)
  @answer.each do |a|
    ans.push(Question.find(a.question_id))
  end
  respond_to do |format|
  format.html # index.html.erb
  format.json { render :json => @answer }
  end

end


# End of Controllers for Profiles View #



# Controllers for Users View #

def listofusers
  @users = User.follower_hash(current_user)
  @users.delete_if { |id, value| id.blank? }
  respond_to do |format|
  format.html # index.html.erb
  format.json { render :json => [@users] }
  end
end

def followunfollow

  users = []
  @users = User.all
  @users.each do |user|
    if user.email != current_user.email
      if current_user.following?(user)
        users.push("Unfollow");
      else
        users.push("Follow");
      end
    end
  end

  respond_to do |format|
  format.html # index.html.erb
  format.json { render :json => [users] }
  end

end
end