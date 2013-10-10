class LikesController < ApplicationController

  def create
    @like = Like.new(params[:like])

    if @like.save
      render json: @like
    else
      render json: @comment.errors.full_messages, status: 422
    end
  end


  def show
    @like = Like.find(params[:id])
    if @like
      render json: @like
    else
      render status: 422, json: nil
    end
  end


  def index
    @likes = Like.find_by_pin_id(params[:pin_id])
    render json: @likes.to_json(include: :user)
  end

end
