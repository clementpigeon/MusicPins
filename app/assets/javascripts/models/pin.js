MP.Models.Pin = Backbone.Model.extend({
  urlRoot: '/pins',

  // parse: function(response) {
  //     console.log(response);
  //     response['likes'] = new MP.Collections.Likes(response['likes'], {
  //       url: '/pins/' + response["id"] + '/like'
  //     });
  //
  //     response['gist_files'] = new GistCloneApp.Collections.GistFiles(response['gist_files']);
  //     return response;
  //   }


});
