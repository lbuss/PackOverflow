PackOverflow.Views.QuestionsIndex = Backbone.View.extend({
  template: JST['questions/index'],
  
  classname: 'questions-index',
  
  events:{
    "click .switch": "collectionSwitch"
  },
  
  initialize: function(options){
    this.topCollection = options.topCollection;
    this.newCollection = options.newCollection;
    this.unansweredCollection = options.unansweredCollection;
    
    this.listenTo(this.topCollection, "sync", this.render);
    this.listenTo(this.newCollection, "sync", this.render);
    this.listenTo(this.unansweredCollection, "sync", this.render);
    
    this._selectedCollection = this.topCollection;
    this._tabName = '#top'
  },
  
  
  render: function(){
    var content = this.template({
      questions: this._selectedCollection
    });
    
    this.$el.html(content);
    // $('nav-tabs > li').removeClass('active');
    $('li' + this._tabName).addClass('active');
    
    this._selectedCollection.each( function(question){
      var view = new PackOverflow.Views.QuestionIndexShow({
        model: question
      })
      $('.questionList').append($('<li>').html(view.render().$el))
    })
    
    return this;
  },
  
  collectionSwitch: function(event) {
    // event listener - call the right 
    this._tabName = event.currentTarget.name;
    
    var switchHash = {
      '#top':  this.topCollection,      
      '#new': this.newCollection,
      '#unanswered': this.unansweredCollection
    };
    
    this._selectedCollection = switchHash[this._tabName];
    this.render();
  }
  
  
})