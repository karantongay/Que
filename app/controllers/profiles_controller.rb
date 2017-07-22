#Controller to maintain the User profiles in the application
class ProfilesController < ApplicationController

  def index
    @question = Question.where(askedby: current_user.email)
    @folls = current_user.followers #Followers
    @follg = current_user.all_following #Following
    @answer = Answer.where(answeredby: current_user.email)
    respond_to do |format|
      format.html # index.html.erb
      format.json {render :json => [@follg.count, @folls.count, @answer.count]}
    end
  end

  def create
    @profile = Profile.new(profile_params)
    if @question.save
      redirect_to @profile
    else
      render 'new'
    end
  end

  def show
    @user = User.find(params[:id])
    @question1 = Question.where(askedby: @user.email)
    @followers1 = @user.followers
    @following1 = current_user.all_following
    @answer1 = Answer.where(answeredby: @user.email)
  end

  private
    def profile_params
      params.require(:profile).permit(:first_name, :last_name)
    end
  end