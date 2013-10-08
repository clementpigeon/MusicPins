class PinsController < ApplicationController

  def create
    @pin = Pin.new(params[:pin])

    if @pin.save
      render json: @pin
    else
      render json: @pin.errors.full_messages, status: 422
    end
  end


  def show
    if params.include?(:id)
      @pin = Pin.find(params[:id])
      render json: @pin
    else
      render status: 422, json: nil
    end
  end


  def index
    respond_to do |format|
      format.html { render :index }
      format.json do
        @pins = Pin.includes(:song, :band).all
        render json: @pins.to_json(include: [:band, :song])
      end
    end
  end

end
