MP.Views.FollowedBandsDetailView = Backbone.View.extend({

  template: JST['users/followed_bands_detail'],

  tagName: 'li',

  render: function () {
    this.$el.html(this.template({band_following: this.model}));
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
