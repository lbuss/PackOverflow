PackOverflow.Collections.Answers = Backbone.Collection.extend({
  model: PackOverflow.Models.Answer,

  initialize: function(models, options) {
    if (options.question){
      this.question = options.question;
    } else if (options.answer){
      this.answer = options.answer;
    }
  }

});