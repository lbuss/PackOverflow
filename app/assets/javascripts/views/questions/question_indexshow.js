PackOverflow.Views.QuestionIndexShow = Backbone.View.extend({
  template: JST['questions/indexshow'],
  
  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
  },
  
  render: function() {
    var content = this.template({
      question: this.model
    });
    this.$el.html(content);
    return this;
  }
});