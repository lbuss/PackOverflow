PackOverflow.Views.AnswerShow = Backbone.View.extend({
  template: JST['answers/show'],
  
  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
    
    // var ListNewView = new TrelloClone.Views.ListsNew();
//     this.addSubview(".newList", ListNewView); subform for answering in future
  },
  
  render: function() {
    var content = this.template({
      answer: this.model
    });
    this.$el.html(content);
    
    
    return this;
  }
});