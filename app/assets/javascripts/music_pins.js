window.MP = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    console.log('Backbone initializing');
    this.$rootEl = $('#content');
    this.$topBar = $('#topbar')
    this.router = new MP.Routers.PinsRouter(this.$rootEl, this.$topBar);
    Backbone.history.start();
  }
};


