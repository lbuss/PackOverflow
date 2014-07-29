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
    
    if(payload.votes) {
      this.votes().set(payload.votes, {parse: true});
      delete payload.votes;
    }
    //
    // if(payload.vote_count){
    //   this.voteCount();
    //   // .set()(payload.vote_count, {parse: true});
    //   delete payload.votes;
    // }
    //
    // if(payload.username){
//       this.author(payload.username);
//       delete payload.username;
//     }

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
  },
  
  votes: function() {
    if (!this._votes) {
      this._votes = new PackOverflow.Collections.Votes([], {
        question: this
      });
    }
    return this._votes;
  },
  //
  // voteCount: function() {
  //   if (!this._voteCount) {
  //     this._voteCount = 0
  //   }
  //   return this._votes;
  // },
  //
  // author: function(name) {
  //   if (!this._username) {
  //     this._username = name;
  //   }
  //   return this._username;
  // }
})