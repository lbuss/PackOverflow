PackOverflow.Models.Answer = Backbone.Model.extend({
  urlRoot: 'api/answers',
  
  parse: function(payload) {
    if(payload.comments) {
      this.comments().set(payload.comments, {parse: true});
      delete payload.comments;
    }
    
    if(payload.votes) {
      this.votes().set(payload.votes, {parse: true});
      delete payload.votes;
    }
    
    if(payload.vote_count){
      this.voteCount().set()(payload.vote_count, {parse: true});
      delete payload.votes;
    }
    
    return payload;
  },
  
  comments: function() {
    if (!this._comments) {
      this._comments = new PackOverflow.Collections.Comments([], {
        answer: this
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
  }
  
})