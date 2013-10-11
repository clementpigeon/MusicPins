MP.Models.Comment = Backbone.Model.extend({
  urlRoot: '/comments',

  current_user_is_author: function(){
    console.log('current_user_is_author');
    if (this.current_user_id === this.user_id) {
      console.log('current_user_is_author');
      return true;
    }
    else {
      console.log('current_user is not author');
      return false;
    }
  }

});
