PackOverflow.Collections.Questions = Backbone.Collection.extend({
  model: PackOverflow.Models.Question,
  url: 'api/questions',
  
  getOrFetch: function(id) {
    var questions = this;
    
    var question;

    debugger;
    if (question = this.get(id)) {
      question.fetch();
    } else {
      question = new PackOverflow.Models.Question({ id: id });
      question.fetch({
        success: function() { questions.add(question); }
      });
    }
    return question;
  }
  
});

PackOverflow.Collections.questions = new PackOverflow.Collections.Questions();