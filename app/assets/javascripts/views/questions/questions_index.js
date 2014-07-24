PackOverflow.Views.QuestionsIndex = Backbone.View.extend({
  template: JST['questions/index'],
  
  classname: 'questions-index',
  
  initialize: function(){
    // this.listenTo(this.collection, "sync add", this.render);
  },
  
  
  render: function(){

    var content = this.template({
      questions: this.collection
    });
    
    this.$el.html(content);
    return this;
  }
  
})