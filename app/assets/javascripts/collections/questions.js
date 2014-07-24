PackOverflow.Collections.Questions = Backbone.Collection.extend({
  model: PackOverflow.Models.Question,
  url: 'api/questions',
  
  getOrFetch: function(id) {
    var question = this.get(id);
    
    if (!question) {
      question = new PackOverflow.Models.Question({ id: id });
      question.fetch({
        success: function() { 
          PackOverflow.Collections.questions.add(question);
         }.bind(this)
      });
    } else {
      question.fetch();
    }
    
    return question;
  }
  
});

PackOverflow.Collections.questions = new PackOverflow.Collections.Questions