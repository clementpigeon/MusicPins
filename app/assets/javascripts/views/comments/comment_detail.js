MP.Views.CommentDetailView = Backbone.View.extend({

  template: JST['comments/detail'],

  render: function () {
    var that = this;
    that.$el.html(that.template({comment: this.model}));
    return that;
  }

});
