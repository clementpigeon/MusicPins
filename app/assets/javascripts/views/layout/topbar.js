MP.Views.TopBarView = Backbone.View.extend({

  template: JST['layout/topbar'],

  tagname: 'div#topbar',

  render: function () {
    var that = this;
    that.$el.html(that.template());



    return that;
  }



});
