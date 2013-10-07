MP.Views.PinsIndexView = Backbone.View.extend({

  template: JST['pins/index'],

  render: function () {
    var that = this;
    that.$el.html(that.template());

    that.collection.each(function(pin){
      var pinCardView = new MP.Views.PinCardView({ model: pin });
      that.$el.find('div.feed_container').append(pinCardView.render().$el);
    });

    return that;
  }

});
