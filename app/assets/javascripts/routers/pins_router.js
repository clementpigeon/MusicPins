MP.Routers.PinsRouter = Backbone.Router.extend({
  routes: {
    '': "index",
    'new': 'newPin'
  },

  initialize: function($rootEl, $topBar){
    this.$rootEl = $rootEl;
    this.$topBar = $topBar;
  },

  index: function(){
    var that = this;
    var pins = new MP.Collections.Pins();

    pins.fetch({
      success: function() {
        that.pinsIndexView = new MP.Views.PinsIndexView({ collection: pins });
        that.$rootEl.html(that.pinsIndexView.render().$el);
      },
      error: function() {
        console.log("Failed to fetch.");
      }
    });

  },

  newPin: function(){
    if (this.pinsIndexView) {
      this.pinsIndexView.remove();
    }
    this.newPinSongSelectView = new MP.Views.NewPinSongSelectView();
    this.$rootEl.html(this.newPinSongSelectView.render().$el);
  }
});
