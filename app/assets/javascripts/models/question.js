PackOverflow.Models.Question = Backbone.Model.extend({
  urlRoot: 'api/questions',
  
  parse: function(payload) {
    // if(payload.lists) {
 //      this.lists().set(payload.lists, {parse: true});
 //      delete payload.lists;
 //    }
    return payload;
  },
  
})