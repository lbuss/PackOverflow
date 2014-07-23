window.PackOverflow = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new PackOverflow.Routers.Router
    Backbone.history.start();
  }
};

$(document).ready(function(){
  // PackOverflow.initialize();
});
