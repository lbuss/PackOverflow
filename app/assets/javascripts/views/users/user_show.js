PackOverflow.Views.UserShow = Backbone.View.extend({

  template: JST['users/show'],
  
  initialize: function(options) {
    this.model = options.model;
    this.questionCollection = options.questionCollection;
    this.answerCollection = options.answerCollection;
    this.commentCollection = options.commentCollection;
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.questionCollection, "sync", this.render);
    this.listenTo(this.answerCollection, "sync", this.render);
    this.listenTo(this.commentCollection, "sync", this.render);
  },
  
  events: {
  },
  
  render: function() {
    
    var content = this.template({
      user: this.model,
      questionCollection: this.questionCollection,
      answerCollection: this.answerCollection,
      commentCollection: this.commentCollection
    });
  
    this.$el.html(content);

    return this;
  },
  
});