MP.Routers.PinsRouter = Backbone.Router.extend({
  routes: {
    '': "index"
  },

  initialize: function($rootEl, $topBar){
    this.$rootEl = $rootEl;
    this.$topBar = $topBar
  },

  index: function(){
    var pins = new MP.Collections.Pins()
    pins.fetch({
      success: function() {
        console.log(pins);
      },
      error: function() {
        console.log("Failed to fetch.");
      }
    })
  }
});
