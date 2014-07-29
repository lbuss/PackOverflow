PackOverflow.Models.Comment = Backbone.Model.extend({
  urlRoot: 'api/comments',
  
  parse: function(payload) {
    if(payload.votes) {
      this.votes().set(payload.votes, {parse: true});
      delete payload.votes;
    }
    
    // if(payload.vote_count){
 //      this.voteCount().set()(payload.vote_count, {parse: true});
 //      delete payload.votes;
 //    }
    
    if(payload.username){
      this.username = payload.username;
      delete payload.username;
    }
    
    return payload;
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