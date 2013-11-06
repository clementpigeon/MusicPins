MP.Views.FacebookLookupView = Backbone.View.extend({

  template: JST['facebook/facebook-lookup'],

  initialize:function(){

  },

  className: 'FacebookLookupView',

  render: function () {
    this.$el.html(this.template());
    this.facebook_init(document, 'script', 'facebook-jssdk');
    this.facebook_prepare();

    return this;
  },

  facebook_prepare: function(){
    var that = this;
    window.fbAsyncInit = function() {
        // init the FB JS SDK
      FB.init({
        appId      : '326940164112618',    // App ID from the app dashboard
        // channelUrl : '//WWW.YOUR_DOMAIN.COM/channel.html', // Channel file
        status     : true,     // Check Facebook Login status
        // xfbml      : true      // Look for social plugins on the page
      });

      FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {
          console.log('connected');
          var uid = response.authResponse.userID;
          var accessToken = response.authResponse.accessToken;
        }
        else if (response.status === 'not_authorized') {
          console.log('not auth');
        }
        else {
          console.log('not logged');
        }
      });

      FB.login(function(response) {
        that.photosLookup();
       },
       {scope: 'email,user_photos'}
      );
  };
  },

  facebook_init: function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/all.js";
    fjs.parentNode.insertBefore(js, fjs);
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
