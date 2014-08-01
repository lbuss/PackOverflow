PackOverflow.Routers.Router = Backbone.Router.extend({
  initialize: function() {
  
  this.$rootEl = $('#main');
  },
  
  routes: {
    '': 'questionIndex',
    'questions/new': 'askQuestion',
    'questions/:id': 'showQuestion',
    'users/:id': 'showUser',
  },
  
  questionIndex: function() {
    PackOverflow.Collections.topQuestions = new PackOverflow.Collections.Questions;
    PackOverflow.Collections.newQuestions = new PackOverflow.Collections.Questions;
    PackOverflow.Collections.unansweredQuestions = new PackOverflow.Collections.Questions;
    this.loadQuestions();
    
    var view = new PackOverflow.Views.QuestionsIndex({
      topCollection: PackOverflow.Collections.topQuestions,
      newCollection: PackOverflow.Collections.newQuestions,
      unansweredCollection: PackOverflow.Collections.unansweredQuestions
    });
    
    this._swapView(view);
  },
  
  
  
  askQuestion: function() {
    var view = new PackOverflow.Views.QuestionForm();
    this._swapView(view);
    $("#editor").wysiwyg();
    $('.btn').tooltip();
  },
  
  showQuestion: function(id) {
    var question = PackOverflow.Collections.questions.getOrFetch(id);
    var view = new PackOverflow.Views.QuestionShow({
      model: question,
      collection: question.answers()
    });
    this._swapView(view);
  },
  
  showUser: function(id) {
    var user = new PackOverflow.Models.User({id: id});
    user.fetch();
    var view = new PackOverflow.Views.UserShow({
      model: user,
      topQuestionCollection: user.topQuestions(),
      newQuestionCollection: user.newQuestions(),
      topAnswerCollection: user.topAnswers(),
      newAnswerCollection: user.newAnswers(),
    });
    this._swapView(view);
  },
  
  loadQuestions: function() {
    $.ajax({url:'/api/questions',
    dataType: 'json',
    success: function(data){
      PackOverflow.Collections.topQuestions.set(data.topQuestions);
      PackOverflow.Collections.newQuestions.set(data.newQuestions);
      PackOverflow.Collections.unansweredQuestions.set(data.unansweredQuestions);
      PackOverflow.Collections.topQuestions.trigger('sync');
    }
  })
  },
  
  _swapView: function (view) {
    this.currentView && this.currentView.remove();
    this.currentView = view;
    this.$rootEl.html(view.render().$el)
  }
})