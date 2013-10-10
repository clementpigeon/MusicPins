MP.Views.CommentsIndexView = Backbone.View.extend({

  template: JST['comments/index'],

  className: 'comments',

  render: function () {
    var that = this;
    that.$el.html(that.template());

    that.collection.each(function(comment){
      var commentDetailView = new MP.Views.CommentDetailView({ model: comment });
      that.$el.append(commentDetailView.render().$el);
    });
    var commentDetailView = new MP.Views.CommentNewView();
    that.$el.append(commentDetailView.render().$el);
    return that;
  }


});
