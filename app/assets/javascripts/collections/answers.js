PackOverflow.Collections.Answers = Backbone.Collection.extend({
  model: PackOverflow.Models.Answer,

  initialize: function(models, options) {
    this.question = options.question;
  }

});