MP.Views.FollowedSongsView = Backbone.View.extend({

  template: JST['users/followed_songs'],

  className: 'followed',

  initialize: function(){
    this.listenTo(this.collection, 'remove', this.render);
    this.subs = [];
  },

  events: {
    'click .white_overlay' : 'removeView'
  },

  render: function () {
    var that = this;
    this.$el.html(this.template());
    this.collection.each(function(song_following){
      var followedSongsDetailView = new MP.Views.FollowedSongsDetailView({
        model: song_following
      });
      that.subs.push(followedSongsDetailView);
      that.$el.find('ul').append(followedSongsDetailView.render().$el);
    });

    return this;
  },

  removeView: function(){
    this.remove();
    _(this.subs).each(function(sub){
      sub.remove();
    });
  }

});
