MP.Views.NewPinSavePinView = Backbone.View.extend({

  template: JST['pins/new_pin_save_pin'],

  // initialize: function(newPinFreebaseSongSelectView){
  //   this.newPinFreebaseSongSelectView = newPinFreebaseSongSelectView;
  // },

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
    var current_user_id = JSON.parse($("#bootstrapped_current_user_id").html());

    var newPin = {
      pin : {
        user_id: current_user_id,
        link: formData["pin"]["link"],
        text: formData["pin"]["text"]
      }
    };

    var band_mid = this.newPinFreebaseSongSelectView.current_band_mid;
    var band_name = this.newPinFreebaseSongSelectView.current_band_name;
    var song_mid = this.newPinFreebaseSongSelectView.song_mid;
    var song_title = this.newPinFreebaseSongSelectView.song_title;

    this.getBandIdOrCreateBand(band_mid, band_name, function(band_id){

      that.getSongIdOrCreateSong(song_mid, song_title, band_id, function(song_id){

        newPin.pin.song_id = song_id;
        var pin = new MP.Models.Pin(newPin);
        pin.save(null, {
          success: function(pin){
            console.log('pin creation success!')
            that.returnToFeed();
          },
          error: function(res){
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
          console.log('creating new band')
          bands.create({
            mid: band_mid,
            name: band_name
          }, {
            success: function(data){
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
          console.log('creating new song')
          songs.create({
            band_id: band_id,
            mid: song_mid,
            title: song_title

          }, {
            success: function(data){
              callback(data.get('id'));
            }
          })
        }

      }
    });
  },

  returnToFeed: function(){
    this.remove();
    MP.router.navigate("/", {trigger: true});
  }

});
