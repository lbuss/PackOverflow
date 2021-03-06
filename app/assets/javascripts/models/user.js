PackOverflow.Models.User = Backbone.Model.extend({
  urlRoot: 'api/users',
  
  parse: function(payload) {
    if(payload.answers) {
      this.answers().set(payload.answers, {parse: true});
      delete payload.answers;
    }
    if(payload.questions) {
      payload.questions.forEach(
        function(question){
          if(question.num_answers && question.sum_votes){
            question.sum_votes /= question.num_answers;
          }
        }
      )
      this.questions().set(payload.questions, {parse: true});
      delete payload.questions;

    }
    return payload;
  },
  
  questions: function() {
    if (!this._questions) {
      this._questions = new PackOverflow.Collections.Questions([], {
        user: this
      });
    }
    return this._questions;
  },

  
  answers: function() {
    if (!this._answers) {
      this._answers = new PackOverflow.Collections.Answers([], {
        user: this
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