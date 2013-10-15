MP.Views.FlickrLookupView = Backbone.View.extend({

  template: JST['flickr/flickr-lookup'],

  initialize:function(){

  },

  events: {
    'submit .flickr_username_form': 'usernameOrEmailLookup',
    'submit .flickr_search_form': 'searchPhotos',
  },

  className: 'FlickrLookupView',

  render: function () {
    this.$el.html(this.template());
    return this;
  },

  usernameOrEmailLookup:function(){
    var that = this;
    event.preventDefault();
    var input = $('.flickr_username').val();

    if (input.indexOf('@') > -1) {
      that.emailLookup(input);
    }
    else {
      that.usernameLookup(input)
    }
  },

  usernameLookup: function(username){
    console.log('username lookup');
    console.log(username);
    var that = this;
  	var apiKey = '6ec23b35773204fd29d50bebb731e7a2';
    $.ajax({
      dataType: "json",
      url: 'http://api.flickr.com/services/rest/',
      data: {
        method: 'flickr.people.findByUsername',
        api_key: apiKey,
        username: username,
        format: 'json',
        nojsoncallback: true,
        per_page: 50
      },
      success: function(data){
        if (data.stat === 'fail'){
          console.log(data.message);
        }
        else {
          console.log('success');
          that.photos_for_user(data.user.nsid);
        }
      },
      error: function(data){
        console.log('error');
        console.log(data);
      },
    })
  },

  emailLookup: function(email){
    console.log('email lookup');
    var that = this;
  	var apiKey = '6ec23b35773204fd29d50bebb731e7a2';
    $.ajax({
      dataType: "json",
      url: 'http://api.flickr.com/services/rest/',
      data: {
        method: 'flickr.people.findByEmail',
        api_key: apiKey,
        find_email: email,
        format: 'json',
        nojsoncallback: true,
        per_page: 50
      },
      success: function(data){
        console.log('success');
        console.log(data);
        console.log(data.user.nsid);
        that.photos_for_user(data.user.nsid);
      },
      error: function(data){
        console.log('error');
        console.log(data);
      },
    })

  },

  photos_for_user: function(user_nsid){
    var that = this;
  	var apiKey = '6ec23b35773204fd29d50bebb731e7a2';
    $.ajax({
      dataType: "json",
      url: 'http://api.flickr.com/services/rest/',
      data: {
        method: 'flickr.people.getPublicPhotos',
        api_key: apiKey,
        user_id: user_nsid,
        format: 'json',
        nojsoncallback: true,
        per_page: 50
      },
      success: function(data){
        console.log('success');
        var photos = data.photos.photo;
        console.log(photos);
        that.buildPhotosUrl(photos);
      },
      error: function(data){
        console.log('error');
        console.log(data);
      },
    })
  },


  searchPhotos: function(event){
    var that = this;
    event.preventDefault();
    var input = $('.flickr_search').val();
    this.photos_by_keywords(input);
  },

  photos_by_keywords: function(input){
    var that = this;
  	var apiKey = '6ec23b35773204fd29d50bebb731e7a2';
    $.ajax({
      dataType: "json",
      url: 'http://api.flickr.com/services/rest/',
      data: {
        method: 'flickr.photos.search',
        api_key: apiKey,
        sort: 'relevance',
        text: input,
        format: 'json',
        nojsoncallback: true,
        per_page: 50
      },
      success: function(data){
        console.log('success');
        var photos = data.photos.photo;
        console.log(photos);
        that.buildPhotosUrl(photos);
      },
      error: function(data){
        console.log('error');
        console.log(data);
      },
    })
  },

  buildPhotosUrl: function(photos){
    photos = _(photos).map(function(photoData){
      var url = 'http://farm' + photoData.farm + '.staticflickr.com/' +
      photoData.server + '/' + photoData.id + '_' + photoData.secret + '_m.jpg';
      return url;
    });
    this.photosCallback(photos);
  },

  photosCallback: function(photoLinksArray){
    console.log(photoLinksArray);
    var facebookPhotosView = new MP.Views.FacebookPhotosView(photoLinksArray, this);
    this.$el.append(facebookPhotosView.render().$el);
  },

});
