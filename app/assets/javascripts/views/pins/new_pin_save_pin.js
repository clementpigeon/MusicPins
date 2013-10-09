MP.Views.NewPinSavePinView = Backbone.View.extend({

  template: JST['pins/new_pin_save_pin'],

  render: function () {

    var that = this;
    that.$el.html(that.template());

    return that;
  },

  events: {
    'click button.pinSubmit' : 'createPin'
  },


  createPin: function(event){
    event.preventDefault();
    var that = this;

    var formData = $(event.target.form).serializeJSON();
    var current_user_id = JSON.parse($("#bootstrapped_current_user_id").html());
    formData["pin"]["user_id"] = current_user_id;

    var newPin = {
      pin : {
        user_id: current_user_id,
        link: formData["pin"]["link"],
        text: formData["pin"]["text"]
      }
    };

    var band_mid = formData.pin.band_mid;
    var band_name = formData.pin.band_name;
    var song_mid = formData.pin.song_mid;
    var song_title = formData.pin.song_title;

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
