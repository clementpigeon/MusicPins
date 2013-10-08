window.MP = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    console.log('Backbone initializing');
    this.$rootEl = $('#content');
    this.$topBar = $('#topbar')
    // var topBarView = new MP.Views.TopBarView();
    // this.$topBar.html(topBarView.render().$el);
    new MP.Routers.PinsRouter(this.$rootEl, this.$topBar);
    Backbone.history.start();
  }
};


