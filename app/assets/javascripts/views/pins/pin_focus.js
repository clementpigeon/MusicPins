MP.Views.PinFocusView = Backbone.View.extend({

  template: JST['pins/focus'],

  className: 'pin-focus',

  events: {
    'click .white_overlay' : 'remove_focus'
  },

  render: function () {
    this.$el.html(this.template({ pin: this.model }));
    return this;
  },

  remove_focus: function(){
    this.$el.remove();
  }

});


