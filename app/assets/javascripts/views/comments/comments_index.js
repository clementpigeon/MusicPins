MP.Views.CommentsIndexView = Backbone.View.extend({

  template: JST['comments/index'],

  className: 'comments',

  render: function () {
    var that = this;
    that.$el.html(that.template());

    that.collection.each(function(comment){
      console.log('rendering comment');
      var commentDetailView = new MP.Views.CommentDetailView({ model: comment });
      that.$el.append(commentDetailView.render().$el);
    });

    return that;
  }


});
