MP.Views.NewPinView = Backbone.View.extend({

  template1: JST['pins/new1'],
  template2: JST['pins/new2'],

  className: 'newPin',

  render: function () {

    var that = this;
    that.$el.html(that.template1());

    return that;
  },

  events: {
    'click button.songSelected' : 'songSelected',
    'submit form' : 'createPin'
  },

  songSelected: function(e){
    e.preventDefault();
    e.currentTarget.remove();
    this.$el.find('form').append(this.template2());
  },

  createPin: function(event){
    var that = this;
    event.preventDefault();

    var formData = $(event.target).serializeJSON();
    var current_user_id = JSON.parse($("#bootstrapped_current_user_id").html());
    formData["pin"]["user_id"] = current_user_id;

    var newPin = {
      pin : {
        user_id: current_user_id,
        link: formData["pin"]["link"],
        text: formData["pin"]["text"]
      }
    };
    this.getBandIdOrCreateBand(formData, function(band_id){
      that.getSongIdOrCreateSong(formData, band_id, function(song_id){
        newPin.pin.song_id = song_id;
        var pin = new MP.Models.Pin(newPin);
        pin.save(null, {
          success: function(pin){
            console.log('pin creation success!')
            that.returnToFeed();
          }
        });
      })
    });

  },

  getBandIdOrCreateBand: function(formData, callback){
    var bands = new MP.Collections.Bands();
    bands.fetch({
      success: function(data){

        var foundBand = bands.findWhere({ mid: formData.pin.band_mid });

        if (foundBand) {
          callback(foundBand.get('id'));
        }

        else {
          console.log('creating new band')
          bands.create({
            mid: formData.pin.band_mid,
            name: formData.pin.band_name
          }, {
            success: function(data){
              callback(data.get('id'));
            }
          })
        }

      }
    });
  },

  getSongIdOrCreateSong: function(formData, band_id, callback){
    var songs = new MP.Collections.Songs();
    songs.fetch({
      success: function(data){

        var foundSong = songs.findWhere({ mid: formData.pin.song_mid });

        if (foundSong) {
          callback(foundSong.get('id'));
        }

        else {
          console.log('creating new song')
          songs.create({
            band_id: band_id,
            mid: formData.pin.song_mid,
            title: formData.pin.song_title

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
