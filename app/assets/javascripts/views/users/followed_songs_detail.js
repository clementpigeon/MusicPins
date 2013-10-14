MP.Views.FollowedSongsDetailView = Backbone.View.extend({

  template: JST['users/followed_songs_detail'],

  tagName: 'li',

  render: function () {
    this.$el.html(this.template({song_following: this.model}));
    return this;
  },

  events: {
    'click .delete': 'stopFollowing'
  },

  stopFollowing: function(){
    this.model.destroy({
      success: function() {
        console.log('deleted');
      },
      error: function(res){
        console.log('There was a problem in deleting the band_following');
        console.log(res);
      }
    });

  }
});
