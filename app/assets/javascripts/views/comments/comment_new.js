MP.Views.CommentNewView = Backbone.View.extend({

  template: JST['comments/new'],

  className: 'comment',

  initialize: function(collection){
    this.collection = collection;
  },

  events: {
    'click button.post_comment' : 'postComment'
  },

  render: function () {
    this.$el.html(this.template());
    return this;
  },

  postComment: function(){
    var that = this;
    var body = this.$el.find('.comment_body').val();
    var current_user_id = JSON.parse($("#bootstrapped_current_user_id").html());
    var new_comment = this.collection.create(
      {
        body: body,
        user_id: current_user_id,
        pin_id: 30
      },
      {
        wait: true,
        success: function(comment){
          that.$el.find('.comment_body').val('');
          console.log('comment creation success!');
          },
        error: function(res){
          console.log('error creating the comment');
          console.log(res);
        }
      }
    );
  }

});
