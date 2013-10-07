MP.Views.PinsIndexView = Backbone.View.extend({

  template: JST['pins/index'],

  render: function () {
    var that = this;
    that.$el.html(that.template({
      pins: that.collection
    }));
    console.log(that.collection);
    return that;
  },

});
