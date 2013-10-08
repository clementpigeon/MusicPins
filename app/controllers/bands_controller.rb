class BandsController < ApplicationController

  def create
    @band = Band.new(params[:band])

    if @band.save
      render json: @band
    else
      render json: @band.errors.full_messages, status: 422
    end
  end

end
