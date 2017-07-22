#Handles the show view of users, follow and unfollow functionality
class UsersController < ApplicationController
  def index
    @user = current_user
    @users = User.all
  end
  def show
    @user = User.find_by_username(params[:id])
  end
  def follow
      @user = User.find(params[:id])
      current_user.follow(@user)
  end

  def unfollow
    @user = User.find(params[:id])
    current_user.stop_following(@user)
  end
end