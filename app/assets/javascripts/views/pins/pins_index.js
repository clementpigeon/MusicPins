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
    this.listenForScroll();
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
  },

  listenForScroll: function () {
    $(window).off("scroll"); // remove past view's listeners
    var throttledCallback = _.throttle(this.requestNextPage.bind(this), 200);
    $(window).on("scroll", throttledCallback);
  },

  requestNextPage: function () {
    var that = this;
    if ($(window).scrollTop() > $(document).height() - $(window).height() - 50) {
      if (that.collection.page_number < that.collection.total_pages) {
        that.collection.fetch({
          data: { page: that.collection.page_number + 1 },
          success: function (res) {
            console.log("successfully fetched page " + that.collection.page_number);
            that.addNewPage(res);
          }
        });
      }
    }
  },

  addNewPage: function(res){
    var that = this;
    res.each(function(newPin){
      var pinCardView = new MP.Views.PinCardView({ model: newPin });
      var renderedCard = pinCardView.render().$el;
      that._pinCardViews.push(renderedCard);
      var colDiv = 'div.' + that.which_col();
      that.$el.find(colDiv).append(renderedCard);
      that.listenForScroll();
    })
  }



});
