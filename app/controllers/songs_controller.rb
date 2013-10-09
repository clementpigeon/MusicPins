class SongsController < ApplicationController

  def create
    @song = Song.new(params[:song])

    if @song.save
      render json: @song
    else
      render json: @song.errors.full_messages, status: 422
    end
  end

  def index
    @songs = Song.all
    render json: @songs
  end

end
