PackOverflow.Collections.Votes = Backbone.Collection.extend({
  model: PackOverflow.Models.Vote,

  initialize: function(models, options) {
    if (options.question){
      this.question = options.question;
    } else {
      this.answer = options.answer;
    }
  }

});