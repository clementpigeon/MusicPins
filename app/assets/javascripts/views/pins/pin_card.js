MP.Views.PinCardView = Backbone.View.extend({

  template: JST['pins/card'],
  video_template: JST['pins/video_card'],

  tagName: 'article',
  className: 'pin-card',

  initialize: function(){
    this.model.likes = new MP.Collections.Likes(this.model.get('likes'));
    this.likesView = new MP.Views.LikesView({collection: this.model.likes, pin_id: this.model.get('id')});
  },

  render: function () {

    if (this.model.get('pin_type') == 1){
      this.$el.html(this.video_template({ pin: this.model }));
    }
    else {
      this.$el.html(this.template({ pin: this.model }));
    }
    var current_user_id = JSON.parse($("#bootstrapped_current_user_id").html());


    this.$el.find('.likes').append(this.likesView.render().$el);

    return this;
  },

  leave: function(){
    this.likesView.remove();
    this.remove();
  }

});
