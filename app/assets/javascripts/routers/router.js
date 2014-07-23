PackOverflow.Routers.Router = Backbone.Router.extend({
  initialize: function() {
  
  this.$rootEl = $('#main');
  },
  
  routes: {
    '': 'questionIndex',
    'questions/new': 'askQuestion'
  },
  
  questionIndex: function(){
    PackOverflow.Collections.questions.fetch();
    
    var view = new PackOverflow.Views.questionsIndex({
      collection: PackOverflow.Collections.boards
    });
    
    this._swapView(view);
  },
  
  askQuestion: function(){
    var view = new PackOverflow.Views.questionForm();
    this._swapView(view);
  },
  
  _swapView: function (view) {
    this.currentView && this.currentView.remove();
    this.currentView = view;
    this.$rootEl.html(view.render().$el)
  }
})