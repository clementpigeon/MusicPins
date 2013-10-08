MP.Views.NewPinView = Backbone.View.extend({

  template1: JST['pins/new1'],
  template2: JST['pins/new2'],

  className: 'newPin',

  render: function () {

    var that = this;
    that.$el.html(that.template1());

    return that;
  },

  events: {
    'click button.songSelected' : 'songSelected',
    'submit form' : 'createPin'
  },

  songSelected: function(e){
    e.preventDefault();
    e.currentTarget.remove();
    this.$el.find('form').append(this.template2());
  },

  createPin: function(event){
    event.preventDefault();
    console.log(event.target);

    var formData = $(event.target).serializeJSON();
    var current_user_id = JSON.parse($("#bootstrapped_current_user_id").html());
    formData["pin"]["user_id"] = current_user_id;
    console.log(formData);

    // GistCloneApp.gists.create(formData);

    // check if the song exists and if not create/save it, returns the song_id
    // check if teh band exists and if not create/save it, returns the band_id

    // create a pin BB object and save it!
    // with some validation maybe
    //:user_id, :link, :song_id, :text, :pin_type
  }




});
