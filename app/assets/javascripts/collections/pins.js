MP.Collections.Pins = Backbone.Collection.extend({

  model: MP.Models.Pin,
  url: '/pins',

  parse: function(response) {
    this.page_number = parseInt(response.page_number);
    this.total_pages = parseInt(response.total_pages);
    return JSON.parse(response.models);
  },

});
