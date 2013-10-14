MP.Views.FollowedSongsView = Backbone.View.extend({

  template: JST['users/followed_songs'],

  className: 'followed',

  render: function () {
    this.$el.html(this.template({followed_songs: this.collection}));
    return this;
  },
});
