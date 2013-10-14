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
    console.log(this.model);
    var that = this;
    var ajaxOptions = {
        url: '/song_followings/' + this.model.get('id'),
        type: "DELETE",
        success: function(data, textStatus, jqXHR) {
          console.log('deleted');
          that.render();
        },
        error: function(res){
          console.log('There was a problem in deleting the song_following');
          console.log(res);
        }
      }
    $.ajax(ajaxOptions);

  }
});
