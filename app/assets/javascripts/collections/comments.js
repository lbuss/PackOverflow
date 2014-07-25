PackOverflow.Collections.Comments = Backbone.Collection.extend({
  model: PackOverflow.Models.Comment,

  initialize: function(models, options) {
    if (options.question){
      this.question = options.question;
    } else {
      this.answer = options.answer;
    }
  }

});