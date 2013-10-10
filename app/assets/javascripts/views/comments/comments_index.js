MP.Views.CommentsIndexView = Backbone.View.extend({

  template: JST['comments/index'],

  className: 'comments',

  initialize: function(){
    _(this).bindAll('add', 'remove');
    this._commentsViews = [];
    this.collection.each(this.add);
    this.collection.bind('add', this.add);
    this.collection.bind('remove', this.remove);
  },

  add: function(comment){
    var commentDetailView = new MP.Views.CommentDetailView({ model: comment });
    this._commentsViews.push(commentDetailView);

    if (this._rendered) {
      this.$el.find('.all_comments').append(commentDetailView.render().$el);
    }
  },

  remove: function(model){
    var viewToRemove = _(this._commentsViews).select(function(commentsView){
      return commentsView.model === model;
    })[0];
    this._commentsViews = _(this._commentsViews).without(viewToRemove);

    if (this._rendered) {
      viewToRemove.$el.remove();
    }
  },

  render: function(){
    var that = this;
    that.$el.html(that.template());
    this._rendered = true;

    _(this._commentsViews).each(function(commentsView){
      that.$el.find('.all_comments').append(commentsView.render().$el);
    });

    var commentNewView = new MP.Views.CommentNewView(this.collection);
    this.$el.find('.new_comment').append(commentNewView.render().$el);

    return this;
  }

});
