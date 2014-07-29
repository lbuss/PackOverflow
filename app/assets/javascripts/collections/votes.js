PackOverflow.Collections.Votes = Backbone.Collection.extend({
  model: PackOverflow.Models.Vote,

  initialize: function(models, options) {
    if (options.question){
      this.question = options.question;
    } else if (options.answer){
      this.answer = options.answer;
    } else if (options.comment){
      this.comment = options.comment;
    }
  }

});