
MP.Views.PinsIndexView = Backbone.View.extend({

  template: JST['pins/index'],

  initialize: function(options){
    _.bindAll(this, 'addCardViewToArray', 'render', 'resizedBuffer', 'resized');
    var that = this;

    this.router = options['router'];
    this._pinCardViews = [];

    this.$el.html(that.template());
    this.currentLayout = this.widthToLayout($('body').width());

    this.listenTo(this.collection, 'reset', function(options, other){
      if ($(document).scrollTop() > 50){
        $('body').animate({
          scrollTop: 0
          },
          {
            duration: 1000,
            done: function(){
              that.render()
          }
        })
      }
      else {
        that.render();
      };

    });

    $(window).on("resize", this.resizedBuffer);
  },

  addCardViewToArray: function(pin){
    var pinCardView = new MP.Views.PinCardView({ model: pin });
    this._pinCardViews.push(pinCardView);
  },

  resizedBuffer: function(){
    if (this.resizeTimer) clearTimeout(this.resizeTimer);
    this.resizeTimer = setTimeout(this.resized, 100);
  },

  resized: function(){
    var newWidth = $('body').width();
    var newLayout = this.widthToLayout(newWidth);

    if (newLayout[0] !== this.currentLayout[0]){
      this.currentLayout = newLayout;
      this.render();
    };

  },

  widthToLayout: function(width){
    var colWidth = 240 + 12;
    var nb = parseInt(width / colWidth);
    var modulo = width % colWidth;
    if (modulo < 40) nb--;
    return [nb, colWidth * nb];
  },

  arrange: function () {
    var that = this;

    this.$('section.feed_container').width(this.currentLayout[1]);
    var time = 0;
    var cardNb = 0;

    _(this._pinCardViews).each(function(pinCardView){
      cardNb++;

      var renderedCard = pinCardView.render().$el ;
      if (cardNb > 9){
        setTimeout(function () {
          var colDiv = 'div.' + that.which_col();
          that.$el.find(colDiv).append(renderedCard);
        }, time);
        time += 1;
      }
      else {
        var colDiv = 'div.' + that.which_col();
        that.$el.find(colDiv).append(renderedCard);
      }

    });
    return that;
  },

  render: function () {
    var that = this;

    _(this._pinCardViews).each(function(view){
      view.leave();
    });
    this._pinCardViews = [];

    this.collection.each(this.addCardViewToArray);

    this.arrange();

    this.listenForScroll();
    return that;
  },

  which_col: function(){
    var that = this;
    var smallestCol = 0;
    var smallest = 99999;
    var nbCol = this.currentLayout[0];

    for (var i = 1; i <= nbCol; i++) {
      var height = this.$el.find('div.col' + i).height();
      if (height < smallest){
        smallestCol = i;
        smallest = height;
      }
    }
    return ('col' + smallestCol);
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
        var data = this.router.data;
        data['page'] = that.collection.page_number + 1;
        that.collection.fetch({
          data: data,
          success: function (res) {
            console.log("successfully fetched " + JSON.stringify(data));
            that.addNewPage(res);
          },
          silent: true
        });
      }
    }
  },

  addNewPage: function(res){
    var that = this;
    var time = 100;
    res.each(function(newPin){
      var pinCardView = new MP.Views.PinCardView({ model: newPin });
      that._pinCardViews.push(pinCardView);
      var renderedCard = pinCardView.render().$el;
      setTimeout(function () {
        var colDiv = 'div.' + that.which_col();
        that.$el.find(colDiv).append(renderedCard);
              }, time);
      time += 100;
    });
    that.listenForScroll();
  }


});
