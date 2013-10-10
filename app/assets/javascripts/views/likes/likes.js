MP.Views.LikesView = Backbone.View.extend({

  template: JST['likes/likes'],

  className: 'likeDiv',

  events: {
    'click .like' : 'like',
    'click .unlike' : 'unlike'
  },

  render: function () {
    var current_user_id = JSON.parse($("#bootstrapped_current_user_id").html());

    this.$el.html(this.template({likes: this.collection}));

    if (this.collection.findWhere({user_id: current_user_id})) {
      this.$el.addClass("liked");
    }
    else {
      this.$el.removeClass("liked");
    }
    return this;
  },


  like: function(event) {
    var that = this;
    event.preventDefault();
    var current_user_id = JSON.parse($("#bootstrapped_current_user_id").html());

    this.collection.create({
      user_id: current_user_id,
      pin_id: that.options['pin_id']
    },
    {
      success: function(){
      that.render();
    },
    wait: true
  }
  );
  },

  unlike: function(event) {
    var that = this;
    event.preventDefault();
    var current_user_id = JSON.parse($("#bootstrapped_current_user_id").html());

    var likeToDestroy = this.collection.findWhere({user_id: current_user_id});
    likeToDestroy.destroy({
      success: function(){
        that.render();
      }
    });
  }

});
