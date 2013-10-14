MP.Views.FollowedSongsDetailView = Backbone.View.extend({

  template: JST['users/followed_songs_detail'],

  tagName: 'li',

  render: function () {
    this.$el.html(this.template({followed_song: this.model}));
    return this;
  },
});
