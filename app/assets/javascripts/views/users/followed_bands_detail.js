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
    console.log(this.model);
    var that = this;
    var ajaxOptions = {
        url: '/band_followings/' + this.model.get('id'),
        type: "DELETE",
        success: function(data, textStatus, jqXHR) {
          console.log('deleted');
          that.render();
        },
        error: function(res){
          console.log('There was a problem in deleting the band_following');
          console.log(res);
        }
      }
    $.ajax(ajaxOptions);

  }
});
