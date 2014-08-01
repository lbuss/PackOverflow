PackOverflow.Models.User = Backbone.Model.extend({
  urlRoot: 'api/users',
  
  parse: function(payload) {
    if(payload.answers) {
      this.topAnswers().set(payload.answers.topAnswers, {parse: true});
      delete payload.answers.topAnswers;
      this.newAnswers().set(payload.answers.newAnswers, {parse: true});
      delete payload.answers.newAnswers;
    }
    if(payload.questions) {
      this.topQuestions().set(payload.questions.topQuestions, {parse: true});
      delete payload.questions.topQuestions;
      this.newQuestions().set(payload.questions.newQuestions, {parse: true});
      delete payload.questions.newQuestions;
    }
    return payload;
  },
  
  topQuestions: function() {
    if (!this._topQuestions) {
      this._topQuestions = new PackOverflow.Collections.Questions([], {
        user: this
      });
    }
    return this._topQuestions;
  },
  
  newQuestions: function() {
    if (!this._newQuestions) {
      this._newQuestions = new PackOverflow.Collections.Questions([], {
        user: this
      });
    }
    return this._newQuestions;
  },
  
  topAnswers: function() {
    if (!this._topAnswers) {
      this._topAnswers = new PackOverflow.Collections.Answers([], {
        user: this
      });
    }
    return this._topAnswers;
  },
  
  newAnswers: function() {
    if (!this._newAnswers) {
      this._newAnswers = new PackOverflow.Collections.Answers([], {
        user: this
      });
    }
    return this._newAnswers;
  },
  
  comments: function() {
    if (!this._comments) {
      this._comments = new PackOverflow.Collections.Comments([], {
        question: this
      });
    }
    return this._comments;
  },
  
  votes: function() {
    if (!this._votes) {
      this._votes = new PackOverflow.Collections.Votes([], {
        question: this
      });
    }
    return this._votes;
  },
  
})