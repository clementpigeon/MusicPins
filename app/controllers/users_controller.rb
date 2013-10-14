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
      # @user = User.includes(song_followings: {song: :band}, band_followings: :band).find(params[:id])
      @user = User.find(params[:id])

      render json: @user.to_json(include:
        [
        song_followings:
          {include: { song: { include: :band} } },
        band_followings:
          { include: :band }
          ])
    end
  end

end
