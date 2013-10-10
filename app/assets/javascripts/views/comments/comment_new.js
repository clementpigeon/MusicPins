MP.Views.CommentNewView = Backbone.View.extend({

  template: JST['comments/new'],
  className: 'comment',

  render: function () {
    var that = this;
    that.$el.html(that.template());
    return that;
  }

});
