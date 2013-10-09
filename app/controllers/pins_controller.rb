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
        @pins = Pin.order("pins.created_at DESC").includes(:song, :band, :user)

        if params[:user_id]
          @pins = @pins.where("user_id = ?", params[:user_id].to_i)
        elsif params[:song_id]
          @pins = @pins.where("song_id = ?", params[:song_id].to_i)
        elsif params[:band_id]
          @pins = @pins.where('"songs"."band_id" = ?', params[:band_id].to_i)

             #works
         # @pins = @pins.joins(:song).joins('INNER JOIN "bands" ON "bands"."id" = "songs"."band_id"')
         #    .where('"songs"."band_id" = ?', params[:band_id].to_i)

        end

        render json: @pins.to_json(include: [:band, :song, :user])

      end
    end
  end

end
