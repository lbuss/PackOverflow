PackOverflow.Collections.Questions = Backbone.Collection.extend({
  model: PackOverflow.Models.Question,
  url: 'api/questions'
  
  
});

PackOverflow.Collections.questions = new PackOverflow.Collections.Questions