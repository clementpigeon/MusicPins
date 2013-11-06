MP.Views.TopBarView = Backbone.View.extend({

  template: JST['layout/topbar'],

  className: 'topbar-wrap',

  initialize: function(router){
    this.router = router;
  },

  render: function () {
    var that = this;
    that.$el.html(that.template());

    return that;
  },

  events: {
    'click .add_pin': 'add_pin',
    'click #followed_songs_link' : 'followedSongs',
    'click #followed_bands_link' : 'followedBands',
    'click #popular_bands_link' : 'mostPopularBands',
    'click #popular_songs_link' : 'mostPopularSongs'
  },

  add_pin: function(event){
    event.preventDefault();
    this.router.newPin();
  },

  followedSongs: function(){
    console.log('followedSongs');
    var that = this;
    var user = new MP.Models.User({id: current_user.id});
    user.fetch({
      success: function(data){
        user.set({
          'song_followings': new MP.Collections.SongFollowings(user.get('song_followings'))
        });
        var followedSongsView = new MP.Views.FollowedSongsView({
          collection: user.get('song_followings')
        });
        MP.$box.html(followedSongsView.render().$el)
      },
      error: function(data, other, yetother){
        console.log('error');
      },
    });
  },

  followedBands: function(){
    var that = this;
    var user = new MP.Models.User({id: current_user.id});
    user.fetch({
      success: function(data){
        user.set({
          'band_followings': new MP.Collections.BandFollowings(user.get('band_followings'))
        });
        var followedBandsView = new MP.Views.FollowedBandsView({
          collection: user.get('band_followings')
        });
        MP.$box.html(followedBandsView.render().$el)
      },
      error: function(data, other, yetother){
        console.log('error');
      },
    });
  },

  mostPopularBands: function(){
    var that = this;
    var bands = new MP.Collections.Bands();

    bands.fetch({
      success: function(data){
        var popularBandsView = new MP.Views.PopularBandsView({collection: bands});
        MP.$box.html(popularBandsView.render().$el)
      }
    });
  },

  mostPopularSongs: function(){
    var that = this;
    var songs = new MP.Collections.Songs();

    songs.fetch({
      success: function(data){
        var popularSongsView = new MP.Views.PopularSongsView({collection: songs});
        MP.$box.html(popularSongsView.render().$el)
      }
    });
  },


});
