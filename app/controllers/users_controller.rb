class UsersController < ApplicationController

  before_filter :require_current_user!, :only => [:show]
  before_filter :require_no_current_user!, :only => [:create, :new]

  def create
    @user = User.new(params[:user])

    if @user.save
      self.current_user = @user
      redirect_to :root
    else
      render json: @user.errors.full_messages
    end
  end

  def new
    @user = User.new
  end

  def show
    if params.include?(:id)
      @user = User.includes(:followed_bands, followed_songs: :band).find(params[:id])

      render json: @user.to_json(include: [:followed_bands, followed_songs: { include: :band }])
    end
  end

end
