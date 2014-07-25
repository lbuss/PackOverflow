PackOverflow.Models.Comment = Backbone.Model.extend({
  urlRoot: 'api/comments',
  
  parse: function(payload) {
    // if(payload.lists) {
 //      this.lists().set(payload.lists, {parse: true});
 //      delete payload.lists;
 //    }
    return payload;
  },
  
})