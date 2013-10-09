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
    this.newPinFreebaseSongSelectView = new MP.Views.NewPinFreebaseSongSelectView(this);
    this.$rootEl.html(this.newPinFreebaseSongSelectView.render().$el);
  },

  addSavePinView: function(){
    this.newPinSavePinView = new MP.Views.NewPinSavePinView();
    this.newPinFreebaseSongSelectView.$el.append(this.newPinSavePinView.render(this.newPinFreebaseSongSelectView).$el);
  }

});
