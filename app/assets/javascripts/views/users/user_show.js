PackOverflow.Views.UserShow = Backbone.CompositeView.extend({

  template: JST['users/show'],
  
  initialize: function(options) {
    this.model = options.model;
    this.questionCollection = options.questionCollection;
    this.answerCollection = options.answerCollection;
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.questionCollection, "sync", this.render);
    this.listenTo(this.answerCollection, "sync", this.render);
  },
  
  events: {
  },
  
  render: function() {
    
    var content = this.template({
      user: this.model,
      questionCollection: this.questionCollection,
      answerCollection: this.answerCollection,

    });
    this.$el.html(content);
    
    var that = this;
    this.questionCollection.each( function(question){
      var view = new PackOverflow.Views.QuestionIndexShow({
        model: question,
        username: that.model.get('username')
      })
      $('.questionList').append($('<li>').html(view.render().$el))
    })
    
    this.answerCollection.each(function(answer) {
      var newAnswer = new PackOverflow.Views.AnswerIndexShow({ 
        model: answer,
        username: that.model.get('username')
       });
      that.addSubview(".answerList", newAnswer);
    })
    
    this.attachSubviews();
    return this;
  },
  
});