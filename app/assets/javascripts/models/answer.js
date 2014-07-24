PackOverflow.Models.Answer = Backbone.Model.extend({
  urlRoot: 'api/answers',
  
  parse: function(payload) {
    // if(payload.lists) {
 //      this.lists().set(payload.lists, {parse: true});
 //      delete payload.lists;
 //    }
    return payload;
  },
  
})