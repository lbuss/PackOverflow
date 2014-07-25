PackOverflow.Models.Question = Backbone.Model.extend({
  urlRoot: 'api/questions',
  
  parse: function(payload) {
    if(payload.answers) {
      this.answers().set(payload.answers, {parse: true});
      delete payload.answers;
    }
    
    if(payload.comments) {
      this.comments().set(payload.comments, {parse: true});
      delete payload.comments;
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
  },
  
  comments: function() {
    if (!this._comments) {
      this._comments = new PackOverflow.Collections.Comments([], {
        question: this
      });
    }
    return this._comments;
  }
})