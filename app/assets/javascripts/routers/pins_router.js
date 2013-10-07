MP.Routers.PinsRouter = Backbone.Router.extend({
  routes: {
    '': "index"
  },

  initialize: function($rootEl, $topBar){
    this.$rootEl = $rootEl;
    this.$topBar = $topBar
  },

  index: function(){
    var that = this;
    var pins = new MP.Collections.Pins()
    pins.fetch({
      success: function() {
        var pinsIndexView = new MP.Views.PinsIndexView({
          collection: pins
        });
        that.$rootEl.html(pinsIndexView.render().$el);
      },
      error: function() {
        console.log("Failed to fetch.");
      }
    })
  }
});
