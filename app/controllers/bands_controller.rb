class BandsController < ApplicationController

  def create
    @band = Band.new(params[:band])

    if @band.save
      render json: @band
    else
      render json: @band.errors.full_messages, status: 422
    end
  end

  def index
    @bands = Band.mostPopular
    render json: @bands
  end

end
