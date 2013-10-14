MP.Views.FollowedBandsView = Backbone.View.extend({

  template: JST['users/followed_bands'],

  className: 'followed',

  render: function () {
    var that = this;
    this.$el.html(this.template());
    this.collection.each(function(followed_band){
      var followedBandsDetailView = new MP.Views.FollowedBandsDetailView({
        model: followed_band
      });
      that.$el.find('ul').append(followedBandsDetailView.render().$el);
    });

    return this;
  },
});
