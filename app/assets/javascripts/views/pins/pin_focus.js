MP.Views.PinFocusView = Backbone.View.extend({

  template: JST['pins/focus'],

  className: 'pin-focus',

  events: {
    'click .white_overlay' : 'remove_focus',
    'click .heart' : 'like'
  },

  render: function () {

    this.$el.html(this.template({ pin: this.model }));

    this.likes = new MP.Collections.Likes(this.model.get('likes'));

    this.comments = new MP.Collections.Comments(this.model.get('comments'));
    this.commentsIndexView = new MP.Views.CommentsIndexView({collection: this.comments, pin_id: this.model.get('id')});
    this.$el.find('.focus_container').append(this.commentsIndexView.render().$el);

    return this;
  },

  remove_focus: function(){
    this.$el.remove();
  },

  like: function(event) {
      var that = this;
      event.preventDefault();
      var current_user_id = JSON.parse($("#bootstrapped_current_user_id").html());

      console.log(this.likes);
      this.likes.create({
        user_id: current_user_id,
        pin_id: that.model.get("id")
      });

      this.$el.find('.likes').addClass("liked");
    },

    unlike: function(event) {
        var that = this;
        event.preventDefault();
        var current_user_id = JSON.parse($("#bootstrapped_current_user_id").html());

        console.log(this.likes);
        this.likes.create({
          user_id: current_user_id,
          pin_id: that.model.get("id")
        });

        this.find('.likes').addClass("liked");
      },


});


