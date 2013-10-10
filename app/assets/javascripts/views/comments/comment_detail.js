MP.Views.CommentDetailView = Backbone.View.extend({

  template: JST['comments/detail'],
  className: 'comment',

  render: function () {
    this.$el.html(this.template({comment: this.model}));
    return this;
  }

});
