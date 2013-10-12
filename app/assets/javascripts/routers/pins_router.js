MP.Routers.PinsRouter = Backbone.Router.extend({
  routes: {
    '': "mainFeed",
    'new': 'newPin',
    'user/:user_id': 'userFeed',
    'song/:song_id': 'songFeed',
    'band/:band_id': 'bandFeed',
    'pin/:pin_id' : 'pinFocus',
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
    var data = {user_id: user_id};
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
      this.$rootEl.append(this.pinFocusView.render().$el);
    }
  }

});
