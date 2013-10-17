window.MP = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    console.log('Backbone initializing');
    this.$rootEl = $('#content');
    this.$topBar = $('#topbar');
    this.$box = $('#box');
    this.router = new MP.Routers.PinsRouter(this.$rootEl, this.$topBar, this.$box);
    Backbone.history.start();
  }
};


