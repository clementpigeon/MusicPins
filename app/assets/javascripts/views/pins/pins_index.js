MP.Views.PinsIndexView = Backbone.View.extend({

  template: JST['pins/index'],

  col_index: 0,

  colNumber: 4,

  which_col: function(){
    this.col_index++;
    if (this.col_index > this.colNumber) this.col_index = 1;
    return ('col' + this.col_index);
  },

  initialize: function(){
    _.bindAll(this, 'addCardViewToArray');
    this._pinCardViews = [];
    this.collection.each(this.addCardViewToArray);

  },

  addCardViewToArray: function(pin){
    var pinCardView = new MP.Views.PinCardView({ model: pin });
    this._pinCardViews.push(pinCardView.render().$el);
  },

  render: function () {
    var that = this;
    that.$el.html(that.template());

    _(this._pinCardViews).each(function(pinCardView){
      var colDiv = 'div.' + that.which_col();
      that.$el.find(colDiv).append(pinCardView);
    });
    return that;
  },


});
