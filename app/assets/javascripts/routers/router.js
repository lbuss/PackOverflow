PackOverflow.Routers.Router = Backbone.Router.extend({
  initialize: function() {
  
  this.$rootEl = $('#main');
  },
  
  routes: {
    '': 'questionIndex',
    'questions/new': 'askQuestion',
    'questions/:id': 'showQuestion',
    'users/:id': 'showUser'
  },
  
  questionIndex: function() {
    PackOverflow.Collections.questions.fetch();
    var view = new PackOverflow.Views.QuestionsIndex({
      collection: PackOverflow.Collections.questions
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
      questionCollection: user.questions(),
      answerCollection: user.answers(),
      commentCollection: user.comments(),
    });
    this._swapView(view);
  },
  
  _swapView: function (view) {
    this.currentView && this.currentView.remove();
    this.currentView = view;
    this.$rootEl.html(view.render().$el)
  }
})