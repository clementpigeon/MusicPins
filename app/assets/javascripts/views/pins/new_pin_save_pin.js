MP.Views.NewPinSavePinView = Backbone.View.extend({

  template: JST['pins/new_pin_save_pin'],

  render: function (newPinFreebaseSongSelectView) {
    this.newPinFreebaseSongSelectView = newPinFreebaseSongSelectView;
    this.$el.append(this.template());
    this.collection = newPinFreebaseSongSelectView.pins;
    return this;
  },

  events: {
    'submit form#createPin' : 'createPin',
    'click .fb-lookup' : 'facebookPhoto',
    'click .flickr-lookup' : 'flickrPhoto',
    'click .instagram-lookup' : 'instagramPhoto',
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
        text: formData["pin"]["text"],
        pin_type: formData["pin"]["pin_type"]
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

        var pin = that.collection.create(newPin,
          {
          success: function(pin){
            console.log('Pin creation success');
            that.createSongFollowing();
            that.createBandFollowing();
            that.redirectToPins();
          },
          error: function(res){
            console.log('Pin creation failure');
            console.log(res);
          },
          wait: true
        });
      })
    });

  },

  getBandIdOrCreateBand: function(band_mid, band_name, callback){
    var that = this;
    var ajaxOptions = {
        url: '/bands',
        type: "POST",
        data: {
          band: {
            mid: band_mid,
            name: band_name
          }
        },
        success: function(data, textStatus, jqXHR) {
          if (jqXHR.status == 200) console.log('Band found');
          if (jqXHR.status == 201) console.log('Band created');
          callback(data.id);
        },
        error: function(res){
          console.log('There was a problem in creating the band');
          console.log(res);
        }
      }
    $.ajax(ajaxOptions);
  },

  getSongIdOrCreateSong: function(song_mid, song_title, band_id, callback){
    var that = this;
    var ajaxOptions = {
        url: '/songs',
        type: "POST",
        data: {
          song: {
            band_id: band_id,
            mid: song_mid,
            title: song_title
          }
        },
        success: function(data, textStatus, jqXHR) {
          if (jqXHR.status == 200) console.log('Song found');
          if (jqXHR.status == 201) console.log('Song created');
          callback(data.id);
        },
        error: function(res){
          console.log('There was a problem in creating the song');
          console.log(res);
        }
      }
    $.ajax(ajaxOptions);
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
        success: function(data, textStatus, jqXHR) {
          if (jqXHR.status == 200) console.log('SongFollowing found');
          if (jqXHR.status == 201) console.log('SongFollowing created');
        },
        failure: function(res){
          console.log('Problem creating a SongFollowing');
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
        success: function(data, textStatus, jqXHR) {
          if (jqXHR.status == 200) console.log('BandFollowing found');
          if (jqXHR.status == 201) console.log('BandFollowing created');
        },
        failure: function(res){
          console.log('Problem creating a BandFollowing');
          console.log(res);
        }
      }
    $.ajax(ajaxOptions);
  },

  redirectToPins: function(){
    this.remove();
    if (this.facebookLookupView) this.facebookLookupView.remove();
    if (this.flickrLookupView) this.flickrLookupView.remove();
    if (this.instagramLookupView) this.instagramLookupView.remove();
    this.newPinFreebaseSongSelectView.remove();
    $('#overlay').hide();
    if (Backbone.history.fragment == ("user/" + window.current_user.id)) {
      MP.router.userFeed(window.current_user.id);
    }
    else {
      MP.router.navigate("/user/" + window.current_user.id, {trigger: true});
    }
  },

  facebookPhoto: function(){
    this.facebookLookupView = new MP.Views.FacebookLookupView();
    this.$el.find('.external_photos').html(this.facebookLookupView.render().$el);
  },

  flickrPhoto: function(){
    this.flickrLookupView = new MP.Views.FlickrLookupView();
    this.$el.find('.external_photos').html(this.flickrLookupView.render().$el);
  },

  instagramPhoto: function(){
    this.instagramLookupView = new MP.Views.InstagramLookupView();
    this.$el.find('.external_photos').html(this.instagramLookupView.render().$el);
    var instagram_auth_url_local = "https://instagram.com/oauth/authorize/?client_id=79a5009290764cf7b5020180b9edba95&redirect_uri=http://localhost:3000/api_callback&response_type=token";
    var instagram_auth_url_production = "https://instagram.com/oauth/authorize/?client_id=79a5009290764cf7b5020180b9edba95&redirect_uri=http://music-pins.herokuapp.com/api_callback&response_type=token";
    if ($.cookie('instagram_token') === null) window.open(instagram_auth_url_production, '_blank');
  },

});
