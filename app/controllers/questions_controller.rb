# Handles all the operations that deal with creation,
# view and deletion of the questions
class QuestionsController < ApplicationController
  before_action :authenticate_user!
  layout 'application'
  @a = 0
  def new
    @question = Question.new
  end
  def senduser
    respond_to do |format|
    format.html # index.html.erb
    format.json { render :json => [current_user.email] }
    end
  end
  def edit
    @question = Question.find(params[:id])
    if @question.askedby != current_user.email
      flash[:info] = "You cannot edit the question asked by other user!"
      redirect_back(fallback_location: root_path)
    end
  end
  def index
    @questions = Question.all
    @posts = Question.all
    if params[:search]
      @posts = Question.search(params[:search]).order("created_at DESC")
    else
      @posts = nil
    end
    respond_to do |format|
    format.html # index.html.erb
    format.json { render :json => [@questions] }
    end
  end
  def show
    @question = Question.find(params[:id])

    respond_to do |format|
    format.html # index.html.erb
    format.json { render :json => [@question] }
    end
  end
  def create
    @question = Question.new(question_params)
    if @question.save
    respond_to do |format|
    format.html # index.html.erb
    format.json { render :json => [@question] }
    end
  else
    render 'new'
  end

  end
  def update
    @question = Question.find(params[:id])
    if @question.update(question_params)
      redirect_to @question
    else
      render 'edit'
    end
  end
  def destroy
    @question = Question.find(params[:id])
    if @question.askedby != current_user.email
      flash[:notice] = "You cannot delete the question asked by other user!"
      redirect_back(fallback_location: root_path)
      respond_to do |format|
        format.json {render :json => {:msg => "item deleted!"},:status => 200}
      end
    else
      @question.destroy
  end
  end
  def question_params
    params.require(:question).permit(:title, :contents, :askedby)
  end
end