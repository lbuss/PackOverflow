PackOverflow.Views.QuestionIndexShow = Backbone.View.extend({
  template: JST['questions/indexshow'],
  
  initialize: function(options) {
    this.username = options.username;
    this.listenTo(this.model, "sync", this.render);
  },
  
  render: function() {
    var content = this.template({
      question: this.model,
      username: this.username
    });
    this.$el.html(content);
    return this;
  }
});