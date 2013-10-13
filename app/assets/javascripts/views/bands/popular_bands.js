MP.Views.PopularBandsView = Backbone.View.extend({

  template: JST['bands/popular'],

  className: 'most_popular',

  render: function () {
    this.$el.html(this.template({bands: this.collection}));
    return this;
  },

});
