MP.Views.NewPinView = Backbone.View.extend({

  template: JST['pins/new'],


  render: function () {

    var that = this;
    that.$el.html(that.template());

    return that;
  }



});
