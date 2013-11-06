MP.Routers.PinsRouter = Backbone.Router.extend({
  routes: {
    '': "mainFeed",
    'new': 'newPin',
    'user/:user_id': 'userFeed',
    'user/:user_id/likes': 'likedPinsFeed',
    'song/:song_id': 'songFeed',
    'band/:band_id': 'bandFeed',
    'pin/:pin_id' : 'pinFocus',
    'facebook': 'facebook_lookup',
    'all': 'all'
  },

  initialize: function($rootEl, $topBar, $box){
    var that = this;
    window.current_user = JSON.parse($("#bootstrapped_current_user").html());
    this.$rootEl = $rootEl;
    this.$topBar = $topBar;
    this.$box = $box;

    this.topBarView = new MP.Views.TopBarView(this);
    this.$topBar.html(this.topBarView.render().$el);

    this.pins = new MP.Collections.Pins();;
    this.data = {};

    this.pinsIndexView = new MP.Views.PinsIndexView({
      collection: this.pins,
      el: this.$rootEl,
      router: this
    });
  },

  index: function(){
    var that = this;
    $('#overlay').hide();
    this.data['page'] = 1;

    this.pins.fetch({
      data: this.data,
      error: function() {
        console.log("Failed to fetch.");
      },
      reset: true,
      wait: true
    });

  },

  all: function(){
    this.data = {};
    this.index();
  },

  mainFeed: function(){
    this.data = {main_feed: true};
    this.index();
  },

  userFeed: function(user_id){
    this.data = {
      user_id: user_id,
      likes: false
    };
    this.index();
  },

  songFeed: function(song_id){
    this.data = {song_id: song_id};
    this.index();
  },

  bandFeed: function(band_id){
    this.data = {band_id: band_id};
    this.index();
  },

  likedPinsFeed: function(user_id){
    this.data = {
      likes: true,
      user_id: user_id
    };
    this.index();
  },

  newPin: function(){
    this.newPinFreebaseSongSelectView = new MP.Views.NewPinFreebaseSongSelectView(this, this.pins);
    $('#overlay').show();
    this.$box.html(this.newPinFreebaseSongSelectView.render().$el);
  },

  addSavePinView: function(){
    this.newPinSavePinView = new MP.Views.NewPinSavePinView();
    this.newPinFreebaseSongSelectView.$el.append(this.newPinSavePinView.render(this.newPinFreebaseSongSelectView).$el);
  },

  pinFocus: function(pin_id){
    if (this.pins.length === 0) {
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

  facebook_lookup: function(){
    var that = this;

    var instagramLookupView = new MP.Views.InstagramLookupView();
    that.$rootEl.html(instagramLookupView.render().$el);

  },

});
