class PinsController < ApplicationController
  before_filter :require_current_user!

  def create
    @pin = Pin.new(params[:pin])

    if @pin.save
      render json: @pin
    else
      render json: @pin.errors.full_messages, status: 422
    end
  end


  def show
    @pin = Pin.includes(:song, :band, :user, :likes, comments: :user).find(params[:id])
    if @pin
      render json: @pin.to_json(include: { comments: { include: :user }, band: {}, song: {}, user: {}, likes: {}})
    else
      render status: 422, json: nil
    end
  end


  def index
    respond_to do |format|
      format.html { render :index }
      format.json do
        @pins = Pin.order("pins.created_at DESC").includes(:song, :band, :likes, :user, comments: :user)

        if params[:main_feed]
          @pins = @pins.where('song_id IN (?) OR "songs"."band_id" IN (?)',
          current_user.followed_songs_ids, current_user.followed_bands_ids).page(params[:page])
        elsif params[:user_id]
          if params[:likes] == 'true'
            user = User.find(params[:user_id])
            @pins = @pins.where('id IN (?)', user.liked_pins_ids).page(params[:page])
          else
            @pins = @pins.where("user_id = ?", params[:user_id].to_i).page(params[:page])
          end
        elsif params[:song_id]
          @pins = @pins.where("song_id = ?", params[:song_id].to_i).page(params[:page])
        elsif params[:band_id]
          @pins = @pins.where('"songs"."band_id" = ?', params[:band_id].to_i).page(params[:page])
        else
          @pins = @pins.page(params[:page])
        end

        render json: {

          models: @pins.to_json(include: { comments: { include: :user }, likes: {}, band: {}, song: {}, user: {}}),
          page_number: params[:page],
          total_pages: @pins.total_pages
        }
      end
    end
  end

end
