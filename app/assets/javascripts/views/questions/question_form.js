PackOverflow.Views.QuestionForm = Backbone.View.extend({
  template: JST['questions/form'],
  
  events: {
    "submit form": "submit"
  },
  
  submit: function(event){
    event.preventDefault();
    
    var params = $(event.currentTarget).serializeJSON();
    
    var newBoard = new PackOverflow.Models.Question(params["question"]);
    var that = this;
    newBoard.save({}, {
      success: function() {
        // PackOverflow.Collections.questions.add(newBoard);
        Backbone.history.navigate("/questions/"+newBoard.get("id"), {trigger:true});
      }
    })
  },
  
  render: function () {
      var content = this.template();
      this.$el.html(content);
      return this;
  }
  
});