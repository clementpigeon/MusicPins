MP.Views.FollowedBandsView = Backbone.View.extend({

  template: JST['users/followed_bands'],

  className: 'followed',

  render: function () {
    this.$el.html(this.template({followed_bands: this.collection}));
    return this;
  },
});
