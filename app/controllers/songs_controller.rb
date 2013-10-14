class SongsController < ApplicationController

  def create

    if @existing_song = Song.find_by_mid(params[:song][:mid])
      render json: @existing_song, status: 200

    else @song = Song.new(params[:song])
      if @song.save
        render json: @song, status: 201
      else
        render json: @song.errors.full_messages, status: 422
      end
    end
  end

  def index
    @songs = Song.mostPopular
    render json: @songs
  end

end
