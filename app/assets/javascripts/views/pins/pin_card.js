MP.Views.PinCardView = Backbone.View.extend({

  template: JST['pins/card'],

  tagName: 'article',
  className: 'pin-card',

  initialize: function(){
    this.model.likes = new MP.Collections.Likes(this.model.get('likes'));
  },

  render: function () {
    this.$el.html(this.template({ pin: this.model }));

    var current_user_id = JSON.parse($("#bootstrapped_current_user_id").html());

    this.likesView = new MP.Views.LikesView({collection: this.model.likes, pin_id: this.model.get('id')});
    this.$el.find('.likes').append(this.likesView.render().$el);


    return this;
  }

});
