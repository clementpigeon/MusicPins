MP.Views.NewPinSongSelectView = Backbone.View.extend({

  template: JST['pins/new_pin_song_select'],

  className: 'newPin',

  render: function () {

    var that = this;
    that.$el.html(that.template());

    return that;
  },

  events: {
    'click button.songSelected' : 'songSelected',
  },

  songSelected: function(e){
    e.preventDefault();
    e.currentTarget.remove();

        //

    this.newPinSavePinView = new MP.Views.NewPinSavePinView();
    this.$el.find('form').append(this.newPinSavePinView.render().$el);

    // this.$el.find('form').append(this.template());
  },




});
