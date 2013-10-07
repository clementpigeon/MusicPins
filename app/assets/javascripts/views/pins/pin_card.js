MP.Views.PinCardView = Backbone.View.extend({

  template: JST['pins/card'],

  render: function () {
    this.$el.html(this.template({ pin: this.model }));
    return this;
  }

});
