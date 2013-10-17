MP.Views.TopBarView = Backbone.View.extend({

  template: JST['layout/topbar'],

  className: 'topbar-wrap',

  initialize: function(router){
    this.router = router;
  },

  render: function () {
    var that = this;
    that.$el.html(that.template());

    return that;
  },

  events: {
    'click .add_pin': 'add_pin'
  },

  add_pin: function(event){
    event.preventDefault();
    this.router.newPin();
  }


});
