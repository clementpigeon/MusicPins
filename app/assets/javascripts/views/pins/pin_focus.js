MP.Views.PinFocusView = Backbone.View.extend({

  template: JST['pins/focus'],
  video_template: JST['pins/video_focus'],

  className: 'pin-focus',

  events: {
    'click .white_overlay' : 'remove_focus',
  },

  initialize: function(){
    this.model.likes = new MP.Collections.Likes(this.model.get('likes'));
  },

  render: function () {
    var current_user_id = JSON.parse($("#bootstrapped_current_user_id").html());

    if (this.model.get('pin_type') == 1){
      this.$el.html(this.video_template({ pin: this.model }));
    }
    else {
      this.$el.html(this.template({ pin: this.model }));
    }


    this.likesView = new MP.Views.LikesView({collection: this.model.likes, pin_id: this.model.get('id')});
    this.$el.find('.likes').append(this.likesView.render().$el);

    this.comments = new MP.Collections.Comments(this.model.get('comments'));
    this.commentsIndexView = new MP.Views.CommentsIndexView({collection: this.comments, pin_id: this.model.get('id')});
    this.$el.find('.focus_container').append(this.commentsIndexView.render().$el);

    return this;
  },

  remove_focus: function(){
    this.$el.remove();
    MP.router.navigate("/", {trigger: true});
  }

});


