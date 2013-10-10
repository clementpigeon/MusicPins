MP.Views.PinFocusView = Backbone.View.extend({

  template: JST['pins/focus'],

  className: 'pin-focus',

  events: {
    'click .white_overlay' : 'remove_focus'
  },

  render: function () {

    this.comments = new MP.Collections.Comments(this.model.get('comments'));
    this.$el.html(this.template({ pin: this.model }));

    this.commentsIndexView = new MP.Views.CommentsIndexView({collection: this.comments, pin_id: this.model.get('id')});
    this.$el.find('.focus_container').append(this.commentsIndexView.render().$el);

    return this;
  },

  remove_focus: function(){
    this.$el.remove();
  }

});


