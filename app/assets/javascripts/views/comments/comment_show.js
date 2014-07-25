PackOverflow.Views.CommentShow = Backbone.View.extend({
  tagName: 'li',
  
  template: JST['comments/show'],
  
  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
  },
  
  render: function() {
    var content = this.template({
       comment : this.model
    });
    this.$el.html(content);

    return this;
  }
});