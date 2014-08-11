PackOverflow.Models.Vote = Backbone.Model.extend({
  urlRoot: 'api/votes',
  
  parse: function(payload) {
    return payload;
  },
  
})