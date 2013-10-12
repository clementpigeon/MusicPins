MP.Views.TopBarView = Backbone.View.extend({

  template: JST['layout/topbar'],

  className: 'topbar-wrap',

  render: function () {
    var that = this;
    that.$el.html(that.template());



    return that;
  }



});
