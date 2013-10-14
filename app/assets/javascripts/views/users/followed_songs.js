MP.Views.FollowedSongsView = Backbone.View.extend({

  template: JST['users/followed_songs'],

  className: 'followed',

  render: function () {
    var that = this;
    this.$el.html(this.template());
    this.collection.each(function(song_following){
      var followedSongsDetailView = new MP.Views.FollowedSongsDetailView({
        model: song_following
      });
      that.$el.find('ul').append(followedSongsDetailView.render().$el);
    });

    return this;
  }

});
