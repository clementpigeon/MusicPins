MP.Views.PinsIndexView = Backbone.View.extend({

  template: JST['pins/index'],

  col_index: 0,


  which_col: function(){
    this.col_index++;
    if (this.col_index > 4) this.col_index = 1;
    return ('col' + this.col_index);
  },

  render: function () {
    var that = this;
    that.$el.html(that.template());

    that.collection.each(function(pin){
      var pinCardView = new MP.Views.PinCardView({ model: pin });
      var colDiv = 'div.' + that.which_col();
      that.$el.find(colDiv).append(pinCardView.render().$el);
    });

    return that;
  }

});
