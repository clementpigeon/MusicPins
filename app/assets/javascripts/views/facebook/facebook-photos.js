MP.Views.FacebookPhotosView = Backbone.View.extend({

  template: JST['facebook/facebook-photos'],

  initialize:function(photos, lookupView){
    this.lookupView = lookupView;
    this.photos = photos;
  },

  className: 'FacebookPhotosView',

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
    this.remove();
    this.lookupView.remove();
  }


});
