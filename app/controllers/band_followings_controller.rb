class BandFollowingsController < ApplicationController

  def create
    @band_following = BandFollowing.new(params[:band_following])

    if @band_following.save
      render json: @band_following
    else
      render json: @band_following.errors.full_messages, status: 422
    end
  end


  def index
    @band_followings = BandFollowing.find_by_user_id(params[:user_id])
    render json: @band_followings.to_json(include: :band)
  end


  def destroy
    @band_following = BandFollowing.find_by_id(params[:id])

    if @band_following.destroy
      render json: nil, status: 200
    else
      render json: @band_following.errors, status: 422
    end
  end

end
