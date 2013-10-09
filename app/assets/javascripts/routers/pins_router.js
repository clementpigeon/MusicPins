MP.Routers.PinsRouter = Backbone.Router.extend({
  routes: {
    '': "index",
    'new': 'newPin',
    'user/:user_id': 'user_feed',
    'song/:song_id': 'song_feed',
    'band/:band_id': 'band_feed'
  },

  initialize: function($rootEl, $topBar){
    this.$rootEl = $rootEl;
    this.$topBar = $topBar;
  },

  index: function(data){
    var that = this;
    var pins = new MP.Collections.Pins();

    pins.fetch({
      data: data,
      success: function() {
        that.pinsIndexView = new MP.Views.PinsIndexView({ collection: pins });
        that.$rootEl.html(that.pinsIndexView.render().$el);
      },
      error: function() {
        console.log("Failed to fetch.");
      }
    });

  },

  user_feed: function(user_id){
    var data = {user_id: user_id};
    this.index(data);
  },

  song_feed: function(song_id){
    var data = {song_id: song_id};
    this.index(data);
  },

  band_feed: function(band_id){
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
  }

});
