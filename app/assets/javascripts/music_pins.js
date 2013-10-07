window.MP = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    console.log('Backbone initializing');
    var $rootEl = $('#content');
    var $topBar = $('#topbar')
    new MP.Routers.PinsRouter($rootEl, $topBar);
    Backbone.history.start();
  }
};


