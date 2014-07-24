PackOverflow.Views.QuestionShow = new Backbone.View.extend({
  template: JST['questions/show'],
  
  initialize: function() {
    // this.collection = this.model.answers(); once answers are added
    
    
    // var ListNewView = new TrelloClone.Views.ListsNew();
//     this.addSubview(".newList", ListNewView); subform for answering in future
  },
  
  render: function() {
    debugger;
    var content = this.template({
      question: this.model
    });
    this.$el.html(content);
    
    
    return this;
  }
});