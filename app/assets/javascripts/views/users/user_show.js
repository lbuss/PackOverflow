PackOverflow.Views.UserShow = Backbone.CompositeView.extend({

  template: JST['users/show'],
  
  initialize: function(options) {
    this.questionCollection = options.questionCollection;
    
    this.answerCollection = options.answerCollection;
  
    this._tabNameQ = '#top';
    this._tabNameA = '#top';
    
    this.model = options.model;
    
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.questionCollection, "sync sort", this.render);
    this.listenTo(this.answerCollection, "sync sort", this.render);
  },
  
 
  events:{
    "click .switch": "collectionSort"
  },
  
  
  render: function() {
    
    var content = this.template({
      user: this.model,
      questionCollection: this.questionCollection,
      answerCollection: this.answerCollection,
    });
    this.$el.html(content);
    
    $('li' + this._tabNameQ).addClass('active');
    $('li' + this._tabNameA).addClass('active');
    
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
      $(".answerList").append($('<li>').html(newAnswer.render().$el));
    })
    
    return this;
  },
  
  collectionSort: function(event) {
    // event listener - call the right 
    var targetName = event.currentTarget.name;

    // negative for desc
    var switchHash = {
      '#top': [-1, 'sum_votes'],      
      '#new': [-1, 'created_at'],
      '#unanswered': [1, 'num_answers']
    };

    var multiplier = switchHash[targetName][0];
    var value = switchHash[targetName][1];


    if($(event.currentTarget).hasClass('Q')){
      this._tabNameQ = targetName;
      this.questionCollection.comparator = function(model) { 
        if (typeof model.get(value) === 'string'){
          var date = Date.parse(model.get(value));
          return  multiplier * date;
        }else{
          return  multiplier * model.get(value);
        }
      }
      this.questionCollection.sort();
    } else {
      this._tabNameA = targetName;
      this.answerCollection.comparator = function(model) { 
        if (typeof model.get(value) === 'string'){
          var date = Date.parse(model.get(value));
          return  multiplier * date;
        }else{
          return  multiplier * model.get(value);
        }
      }
      this.answerCollection.sort();
    }
  
  }
});
