MP.Views.NewPinSavePinView = Backbone.View.extend({

  template: JST['pins/new_pin_save_pin'],

  render: function (newPinFreebaseSongSelectView) {
    this.newPinFreebaseSongSelectView = newPinFreebaseSongSelectView;
    this.$el.append(this.template());
    return this;
  },

  events: {
    'submit form#createPin' : 'createPin'
  },

  createPin: function(event){
    event.preventDefault();
    var that = this;

    var formData = $(event.target).serializeJSON();
    this.current_user_id = JSON.parse($("#bootstrapped_current_user_id").html());

    var newPin = {
      pin : {
        user_id: this.current_user_id,
        link: formData["pin"]["link"],
        text: formData["pin"]["text"]
      }
    };

    var band_mid = this.newPinFreebaseSongSelectView.current_band_mid;
    var band_name = this.newPinFreebaseSongSelectView.current_band_name;
    var song_mid = this.newPinFreebaseSongSelectView.song_mid;
    var song_title = this.newPinFreebaseSongSelectView.song_title;

    this.getBandIdOrCreateBand(band_mid, band_name, function(band_id){
      that.band_id = band_id;
      that.getSongIdOrCreateSong(song_mid, song_title, band_id, function(song_id){
        that.song_id = song_id;
        newPin.pin.song_id = song_id;
        var pin = new MP.Models.Pin(newPin);
        pin.save(null, {
          success: function(pin){
            console.log('Pin creation success');
            that.createSongFollowing();
            that.createBandFollowing();
            that.returnToFeed();
          },
          error: function(res){
            console.log('Pin creation failure');
            console.log(res);
          }
        });
      })
    });

  },

  getBandIdOrCreateBand: function(band_mid, band_name, callback){
    var bands = new MP.Collections.Bands();

    bands.fetch({
      success: function(data){
        var foundBand = bands.findWhere({ mid: band_mid });

        if (foundBand) {
          callback(foundBand.get('id'));
        }

        else {
          bands.create({
            mid: band_mid,
            name: band_name
          }, {
            success: function(data){
              console.log('Band creation success');
              callback(data.get('id'));
            }
          })
        }

      }
    });
  },

  getSongIdOrCreateSong: function(song_mid, song_title, band_id, callback){
    var songs = new MP.Collections.Songs();
    songs.fetch({
      success: function(data){

        var foundSong = songs.findWhere({ mid: song_mid });

        if (foundSong) {
          callback(foundSong.get('id'));
        }

        else {
          songs.create({
            band_id: band_id,
            mid: song_mid,
            title: song_title

          }, {
            success: function(data){
              console.log('Song creation success');
              callback(data.get('id'));
            }
          })
        }

      }
    });
  },

  createSongFollowing: function(){
    var that = this;
    var ajaxOptions = {
        url: '/song_followings',
        type: "POST",
        data: {
          song_following: {
            user_id: that.current_user_id,
            song_id: that.song_id

          }
        },
        success: function(data) {
          console.log('SongFollowing creation success');
        },
        failure: function(res){
          console.log('SongFollowing creation failure');
          console.log(res);
        }
      }
    $.ajax(ajaxOptions);
  },

  createBandFollowing: function(){
    var that = this;
    var ajaxOptions = {
        url: '/band_followings',
        type: "POST",
        data: {
          band_following: {
            user_id: that.current_user_id,
            band_id: that.band_id
          }
        },
        success: function(data) {
          console.log('BandFollowing creation success');
        },
        failure: function(res){
          console.log('BandFollowing creation failure');
          console.log(res);
        }
      }
    $.ajax(ajaxOptions);
  },

  returnToFeed: function(){
    this.remove();
    MP.router.navigate("/", {trigger: true});
  }

});
