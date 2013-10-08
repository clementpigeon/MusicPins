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

  createPin: function(e){
    e.preventDefault();
    console.log(e.currentTarget);
  }




});
