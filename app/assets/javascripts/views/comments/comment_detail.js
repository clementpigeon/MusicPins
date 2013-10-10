MP.Views.CommentDetailView = Backbone.View.extend({

  template: JST['comments/detail'],
  className: 'comment',

  render: function () {
    var that = this;
    that.$el.html(that.template({comment: this.model}));
    return that;
  }

});
