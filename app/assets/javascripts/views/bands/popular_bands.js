MP.Views.PopularBandsView = Backbone.View.extend({

  template: JST['bands/popular'],

  className: 'most_popular',

  events: {
    'click a' : 'removeView'
  },

  render: function () {
    this.$el.html(this.template({bands: this.collection}));
    return this;
  },

  removeView: function(){
    this.remove();
  }

});
