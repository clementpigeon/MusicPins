MP.Views.PopularSongsView = Backbone.View.extend({

  template: JST['songs/popular'],

  className: 'most_popular',

  render: function () {
    this.$el.html(this.template({songs: this.collection}));
    return this;
  },

});
