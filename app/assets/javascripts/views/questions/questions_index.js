PackOverflow.Views.QuestionsIndex = Backbone.View.extend({
  template: JST['questions/index'],
  
  classname: 'questions-index',
  
  initialize: function(options){

    this.topCollection = options.topCollection;
    this.newCollection = options.newCollection;
    this.unansweredCollection = options.unansweredCollection;
    
    this.listenTo(this.topCollection, "sync", this.render);
    this.listenTo(this.newCollection, "sync", this.render);
    this.listenTo(this.unansweredCollection, "sync", this.render);
    this.selectedCollection = this.topCollection;
  },
  
  
  render: function(){
    debugger
    var content = this.template({
      questions: this.selectedCollection
    });
    
    this.$el.html(content);
    
    
    this.selectedCollection.each( function(question){
      var view = new PackOverflow.Views.QuestionIndexShow({
        model: question
      })
      $('.questionList').append($('<li>').html(view.render().$el))
    })
    
    return this;
  }
  
})