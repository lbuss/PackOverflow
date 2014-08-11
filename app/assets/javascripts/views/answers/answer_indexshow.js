PackOverflow.Views.AnswerIndexShow = Backbone.View.extend({
  tagName: "li",
  
  template: JST['answers/indexshow'],

  initialize: function(options) {
    this.username = options.username;
    this.listenTo(this.model, "sync", this.render);
  },
  
  render: function() {
    var content = this.template({
      answer: this.model,
      username: this.username
    });
    this.$el.html(content);
    return this;
  }
});