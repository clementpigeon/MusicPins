MP.Views.PinsIndexView = Backbone.View.extend({

  template: JST['pins/index'],

  initialize: function(){
    _.bindAll(this, 'addCardViewToArray', 'render', 'resizedBuffer', 'resized');

    this._pinCardViews = [];
    this.collection.each(this.addCardViewToArray);

    this.currentLayout = this.widthToLayout($('body').width());
    $(window).on("resize", this.resizedBuffer);
  },

  addCardViewToArray: function(pin){
    var pinCardView = new MP.Views.PinCardView({ model: pin });
    this._pinCardViews.push(pinCardView.render().$el);
  },

  resizedBuffer: function(){
    if (this.resizeTimer) clearTimeout(this.resizeTimer);
    this.resizeTimer = setTimeout(this.resized, 100);
  },

  resized: function(){
    var newWidth = $('body').width();
    var newLayout = this.widthToLayout(newWidth);

    if (newLayout[0] !== this.currentLayout[0]){
      this.render(newLayout);
    };
    this.currentLayout = newLayout;
  },

  widthToLayout: function(width){
    var colWidth = 240 + 12;
    var nb = parseInt(width / colWidth);
    var modulo = width % colWidth;
    if (modulo < 40) nb--;
    return [nb, colWidth * nb];
  },

  render: function (newLayout) {
    if (!newLayout) newLayout = this.currentLayout;
    var that = this;
    that.$el.html(that.template());

    this.reactiveLayout(newLayout);
    this.col_index = 0;

    _(this._pinCardViews).each(function(pinCardView){
      var colDiv = 'div.' + that.which_col();
      that.$el.find(colDiv).append(pinCardView);
    });
    return that;
  },

  reactiveLayout: function(newLayout){
    this.colNumber = newLayout[0];
    this.$('section.feed_container').width(newLayout[1]);
  },

  which_col: function(){
    this.col_index++;
    if (this.col_index > this.colNumber) this.col_index = 1;
    return ('col' + this.col_index);
  },

  remove: function() {
      $(window).off("resize", this.resizedBuffer);
      Backbone.View.prototype.remove.apply(this, arguments);
  }

});
