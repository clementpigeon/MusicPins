class BandsController < ApplicationController

  def create

    if @existing_band = Band.find_by_mid(params[:band][:mid])
      render json: @existing_band, status: 200
    else
      @band = Band.new(params[:band])
      if @band.save
        render json: @band, status: 201
      else
        render json: @band.errors.full_messages, status: 422
      end
    end
  end

  def index
    @bands = Band.mostPopular
    render json: @bands
  end

end
