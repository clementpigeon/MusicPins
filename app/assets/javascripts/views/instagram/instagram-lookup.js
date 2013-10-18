MP.Views.InstagramLookupView = Backbone.View.extend({

  template: JST['instagram/instagram-lookup'],

  initialize:function(){

  },

  className: 'InstagramLookupView',

  render: function () {
    this.foundCookie = false;
    this.$el.html(this.template());
    this.regularlyCheckCookie();
    return this;
  },

  regularlyCheckCookie: function(cookieName, callback) {
    var that = this;
    setInterval(function() {
      if ((that.foundCookie === false) && ($.cookie('instagram_token'))) {
        that.foundCookie = true;
        that.photos_for_user();
      }
    }, 200);
  },

  photos_for_user: function(){
    var that = this;
  	var access_token = $.cookie('instagram_token');
    $.ajax({
      dataType: "jsonp",
      url: 'https://api.instagram.com/v1/users/self/media/recent',
      data: {
        access_token: access_token,
      },
      success: function(res){
        console.log('success');
        console.log(res.data);
        var photoLinks = _(res.data).map(function(photo){
          return photo.images.standard_resolution.url;
        })
        console.log(photoLinks);
        that.photosCallback(photoLinks);
      },
      error: function(data){
        console.log('error');
        console.log(data);
      },
    })
  },

  photosLookup : function(){
    var that = this;
    FB.api('/me/photos', function(res) {
    	var allphotos = res.data;
    	var links = [];
    	allphotos.forEach(function(photo){
    		links.push(photo.source);
    	});
    	that.photosCallback(links);
    });
  },

  photosCallback: function(photoLinksArray){
    var facebookPhotosView = new MP.Views.FacebookPhotosView(photoLinksArray, this);
    this.$el.append(facebookPhotosView.render().$el);
  },

});
