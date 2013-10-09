MP.Routers.PinsRouter = Backbone.Router.extend({
  routes: {
    '': "index",
    'new': 'newPin',
    'user/:user_id': 'userFeed',
    'song/:song_id': 'songFeed',
    'band/:band_id': 'bandFeed',
    'pin/:pin_id' : 'pinFocus'
  },

  initialize: function($rootEl, $topBar){
    this.$rootEl = $rootEl;
    this.$topBar = $topBar;
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
    var pin = this.pins.get(pin_id);
    this.pinFocusView = new MP.Views.PinFocusView({model: pin});
    this.$rootEl.append(this.pinFocusView.render().$el);
  }

});
