MP.Routers.PinsRouter = Backbone.Router.extend({
  routes: {
    '': "mainFeed",
    'new': 'newPin',
    'user/:user_id': 'userFeed',
    'user/:user_id/likes': 'likedPinsFeed',
    'user/:user_id/followed_songs': 'followedSongs',
    'user/:user_id/followed_bands': 'followedBands',
    'song/most_popular': 'mostPopularSongs',
    'song/:song_id': 'songFeed',
    'band/most_popular': 'mostPopularBands',
    'band/:band_id': 'bandFeed',
    'pin/:pin_id' : 'pinFocus',
    'facebook': 'facebook_lookup',
    'all': 'all'
  },

  initialize: function($rootEl, $topBar){
    window.current_user = JSON.parse($("#bootstrapped_current_user").html());
    this.$rootEl = $rootEl;
    this.$topBar = $topBar;
    this.topBarView = new MP.Views.TopBarView({  });
    this.$topBar.html(this.topBarView.render().$el);

    this.pins = null;
  },

  index: function(data){
    var that = this;
    this.pins = new MP.Collections.Pins();

    this.pins.fetch({
      data: data,
      success: function() {
        console.log('rendering ' + that.pins.length + ' pin(s)');
        that.pinsIndexView = new MP.Views.PinsIndexView({ collection: that.pins });
        that.$rootEl.html(that.pinsIndexView.render().$el);
      },
      error: function() {
        console.log("Failed to fetch.");
      }
    });

  },

  all: function(){
    this.index({});
  },

  mainFeed: function(){
    var data = {main_feed: true};
    this.index(data);
  },

  userFeed: function(user_id){
    var data = {
      user_id: user_id,
      likes: false
    };
    this.index(data);
  },

  songFeed: function(song_id){
    var data = {song_id: song_id};
    this.index(data);
  },

  bandFeed: function(band_id){
    var data = {band_id: band_id};
    this.index(data);
  },

  likedPinsFeed: function(user_id){
    var data = {
      likes: true,
      user_id: user_id
    };
    this.index(data);
  },

  newPin: function(){
    if (this.pinsIndexView) {
      this.pinsIndexView.remove();
    }
    this.newPinFreebaseSongSelectView = new MP.Views.NewPinFreebaseSongSelectView(this);
    this.$rootEl.html(this.newPinFreebaseSongSelectView.render().$el);
  },

  addSavePinView: function(){
    this.newPinSavePinView = new MP.Views.NewPinSavePinView();
    this.newPinFreebaseSongSelectView.$el.append(this.newPinSavePinView.render(this.newPinFreebaseSongSelectView).$el);
  },

  pinFocus: function(pin_id){
    if (!this.pins) {
      var that = this;
      var pin = new MP.Models.Pin({id: pin_id});
      pin.fetch({
        success: function(){
          that.pinFocusView = new MP.Views.PinFocusView({model: pin});
          var $rendered = that.pinFocusView.render().$el;
          $rendered.find('.white_overlay').hide();
          that.$rootEl.append($rendered);
        }
      });
    }
    else {
      var pin = this.pins.get(pin_id);
      this.pinFocusView = new MP.Views.PinFocusView({model: pin});
      var scrollTop = $(window).scrollTop();
      this.pinFocusView.$el.css('top', scrollTop + 'px');
      this.$rootEl.append(this.pinFocusView.render().$el);
    }
  },

  mostPopularBands: function(){
    var that = this;
    var bands = new MP.Collections.Bands();

    bands.fetch({
      success: function(data){
        var popularBandsView = new MP.Views.PopularBandsView({collection: bands});
        that.$rootEl.html(popularBandsView.render().$el)
      }
    });
  },

  mostPopularSongs: function(){
    var that = this;
    var songs = new MP.Collections.Songs();

    songs.fetch({
      success: function(data){
        var popularSongsView = new MP.Views.PopularSongsView({collection: songs});
        that.$rootEl.html(popularSongsView.render().$el)
      }
    });
  },

  followedSongs: function(user_id){
    var that = this;
    var user = new MP.Models.User({id: user_id});
    user.fetch({
      success: function(data){
        user.set({
          'song_followings': new MP.Collections.SongFollowings(user.get('song_followings'))
        });
        var followedSongsView = new MP.Views.FollowedSongsView({
          collection: user.get('song_followings')
        });
        that.$rootEl.html(followedSongsView.render().$el)
      },
      error: function(data, other, yetother){
        console.log('error');
      },
    });
  },

  followedBands: function(user_id){
    var that = this;
    var user = new MP.Models.User({id: user_id});
    user.fetch({
      success: function(data){
        user.set({
          'band_followings': new MP.Collections.BandFollowings(user.get('band_followings'))
        });
        var followedBandsView = new MP.Views.FollowedBandsView({
          collection: user.get('band_followings')
        });
        that.$rootEl.html(followedBandsView.render().$el)
      },
      error: function(data, other, yetother){
        console.log('error');
      },
    });
  },

  facebook_lookup: function(){
    var that = this;

    var flickrLookupView = new MP.Views.FlickrLookupView();
    that.$rootEl.html(flickrLookupView.render().$el);

  },

});
