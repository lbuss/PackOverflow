PackOverflow.Models.Question = Backbone.Model.extend({
  urlRoot: 'api/questions',
  
  parse: function(payload) {
    if(payload.answers) {
      this.answers().set(payload.answers, {parse: true});
      delete payload.answers;
    }
    return payload;
  },

  answers: function() {
    if (!this._answers) {
      this._answers = new PackOverflow.Collections.Answers([], {
        question: this
      });
    }
    return this._answers;
  }

})