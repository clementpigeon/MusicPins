MP.Views.FollowedBandsDetailView = Backbone.View.extend({

  template: JST['users/followed_bands_detail'],

  tagName: 'li',

  render: function () {
    this.$el.html(this.template({followed_band: this.model}));
    return this;
  },
});
