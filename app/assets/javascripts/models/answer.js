PackOverflow.Models.Answer = Backbone.Model.extend({
  urlRoot: 'api/answers',
  
  parse: function(payload) {
    if(payload.comments) {
      this.comments().set(payload.comments, {parse: true});
      delete payload.comments;
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
  }
  
})