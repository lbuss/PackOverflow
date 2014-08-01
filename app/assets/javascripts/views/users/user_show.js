PackOverflow.Views.UserShow = Backbone.CompositeView.extend({

  template: JST['users/show'],
  
  initialize: function(options) {
    this.topQuestionCollection = options.topQuestionCollection;
    this.newQuestionCollection = options.newQuestionCollection;
    
    this.topAnswerCollection = options.topAnswerCollection;
    this.newAnswerCollection = options.newAnswerCollection;
  
    this._selectedAnswerCollection = this.topAnswerCollection;
    this._selectedQuestionCollection = this.topQuestionCollection;
    this._tabNameQ = '#topQ'
    this._tabNameA = '#topA'
    
    this.model = options.model;
    
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.topQuestionCollection, "sync", this.render);
  },
  
 
  events:{
    "click .switchQ": "collectionSwitchQ",
    "click .switchA": "collectionSwitchA"
  },
  
  
  render: function() {
    
    var content = this.template({
      user: this.model,
      questionCollection: this._selectedQuestionCollection,
      answerCollection: this._selectedAnswerCollection,
    });
    this.$el.html(content);
    
    $('li' + this._tabNameQ).addClass('active');
    $('li' + this._tabNameA).addClass('active');
    
    var that = this;
    this._selectedQuestionCollection.each( function(question){
      var view = new PackOverflow.Views.QuestionIndexShow({
        model: question,
        username: that.model.get('username')
      })
      $('.questionList').append($('<li>').html(view.render().$el))
    })
    
    this._selectedAnswerCollection.each(function(answer) {
      var newAnswer = new PackOverflow.Views.AnswerIndexShow({ 
        model: answer,
        username: that.model.get('username')
       });
      $(".answerList").append($('<li>').html(newAnswer.render().$el));
    })
    
    return this;
  },
  
  collectionSwitchQ: function(event) {
    // event listener - call the right 
    this._tabNameQ = event.currentTarget.name;
  
    var switchHash = {
      '#topQ':  this.topQuestionCollection,      
      '#newQ': this.newQuestionCollection,
    };
  
    this._selectedQuestionCollection = switchHash[this._tabNameQ];
    this.render();
  },
  
  collectionSwitchA: function(event) {
    // event listener - call the right 
    this._tabNameA = event.currentTarget.name;
  
    var switchHash = {
      '#topA':  this.topAnswerCollection,      
      '#newA': this.newAnswerCollection,
    };
  
    this._selectedAnswerCollection = switchHash[this._tabNameA];
    this.render();
  }
  
});
