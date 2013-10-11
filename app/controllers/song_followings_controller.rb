class SongFollowingsController < ApplicationController

  def create
    @song_following = SongFollowing.new(params[:song_following])

    if @song_following.save
      render json: @song_following
    else
      render json: @song_following.errors.full_messages, status: 422
    end
  end


  def index
    @song_followings = SongFollowing.find_by_user_id(params[:user_id])
    render json: @song_followings.to_json(include: :song)
  end


  def destroy
    @song_following = SongFollowing.find_by_id(params[:id])

    if @song_following.destroy
      render json: nil, status: 200
    else
      render json: @song_following.errors, status: 422
    end
  end

end
