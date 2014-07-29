PackOverflow.Collections.SortedCollections = Backbone.Collection.extend({
  model: PackOverflow.Collections.Questions,
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