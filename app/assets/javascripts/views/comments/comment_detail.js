MP.Views.CommentDetailView = Backbone.View.extend({

  template: JST['comments/detail'],
  className: 'comment',
  events: {
    'click .delete': 'delete'
  },

  render: function () {
    this.current_user_id = JSON.parse($("#bootstrapped_current_user_id").html());
    this.$el.html(this.template({comment: this.model}));
    return this;
  },

  delete: function(){
    this.model.destroy();
  },

  current_user_is_author: function(){
    return (this.model.get('user_id') === this.current_user_id)
  }

});
