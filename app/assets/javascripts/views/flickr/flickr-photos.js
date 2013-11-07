MP.Views.FlickrPhotosView = Backbone.View.extend({

  template: JST['facebook/flickr-photos'],

  initialize:function(photos, lookupView){
    this.lookupView = lookupView;
    this.photos = photos;
  },

  className: 'PhotosView',

  events: {
    'click img': 'returnImageLink'
  },

  render: function () {
    var that = this;
    this.$el.html(this.template());
    this.photos.forEach(function(photo){
      var img = $('<div class="fb_photo_div"><img class="fb_photo" src=' + photo + '>');
      that.$el.find('.photos').append(img);
    })


    return this;
  },

  returnImageLink: function(event){
    var imgLink = event.target.src;
    $('#pin_link').val(imgLink);
    $('#pin_link').after('<span class="link_inserted">Image selected</span>');
    this.remove();
    this.lookupView.remove();
  }


});
