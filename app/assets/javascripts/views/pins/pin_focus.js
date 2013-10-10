MP.Views.PinFocusView = Backbone.View.extend({

  template: JST['pins/focus'],

  className: 'pin-focus',

  events: {
    'click .white_overlay' : 'remove_focus',
    // 'click .like' : 'like',
    // 'click .unlike' : 'unlike'
  },

  initialize: function(){
    this.model.likes = new MP.Collections.Likes(this.model.get('likes'));
  },

  render: function () {
    var current_user_id = JSON.parse($("#bootstrapped_current_user_id").html());

    this.$el.html(this.template({ pin: this.model }));

    console.log(this.model.likes);

    this.likesView = new MP.Views.LikesView({collection: this.model.likes, pin_id: this.model.get('id')});
    this.$el.find('.likes').append(this.likesView.render().$el);




    this.comments = new MP.Collections.Comments(this.model.get('comments'));
    this.commentsIndexView = new MP.Views.CommentsIndexView({collection: this.comments, pin_id: this.model.get('id')});
    this.$el.find('.focus_container').append(this.commentsIndexView.render().$el);

    return this;
  },

  remove_focus: function(){
    this.$el.remove();
  },

  // like: function(event) {
  //     var that = this;
  //     event.preventDefault();
  //     var current_user_id = JSON.parse($("#bootstrapped_current_user_id").html());
  //
  //     console.log(this.model.likes);
  //     this.model.likes.create({
  //       user_id: current_user_id,
  //       pin_id: that.model.get("id")
  //     },
  //     {success: function(){
  //       console.log('success');
  //       console.log(that.model.likes);
  //       that.render();
  //     },
  //     wait: true
  //   }
  //   );
  //   },
  //
  //   unlike: function(event) {
  //     console.log('clicked unlike');
  //     var that = this;
  //     event.preventDefault();
  //     var current_user_id = JSON.parse($("#bootstrapped_current_user_id").html());
  //
  //     console.log(this.model.likes);
  //     var likeToDestroy = this.model.likes.findWhere({user_id: current_user_id});
  //     likeToDestroy.destroy(
  //       {success: function(){
  //         console.log('destroy success');
  //         console.log(that.model.likes);
  //         that.render();
  //       } });
  //
  //     },




});


