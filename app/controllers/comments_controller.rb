class CommentsController < ApplicationController

  def create
    @comment = Comment.new(params[:comment])

    if @comment.save
      render json: @comment.to_json(include: :user)
    else
      render json: @comment.errors.full_messages, status: 422
    end
  end


  def show
    @comment = Comment.includes(:user).find(params[:id])
    if @comment
      render json: @comment.to_json(include: :user)
    else
      render status: 422, json: nil
    end
  end


  def index
    @comments = Comment.find_by_pin_id(params[:pin_id])
    render json: @comments
  end


end
