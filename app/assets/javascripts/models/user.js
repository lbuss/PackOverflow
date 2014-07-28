PackOverflow.Models.User = Backbone.Model.extend({
  urlRoot: 'api/users',
  
  parse: function(payload) {
    return payload;
  }
})