MP.Views.FollowedBandsView = Backbone.View.extend({

  template: JST['users/followed_bands'],

  className: 'followed',

  initialize: function(){
    this.listenTo(this.collection, 'remove', this.render);
  },

  render: function () {
    var that = this;
    this.$el.html(this.template());
    this.collection.each(function(band_following){
      var followedBandsDetailView = new MP.Views.FollowedBandsDetailView({
        model: band_following
      });
      that.$el.find('ul').append(followedBandsDetailView.render().$el);
    });

    return this;
  },
});
