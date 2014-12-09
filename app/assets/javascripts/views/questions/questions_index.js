PackOverflow.Views.QuestionsIndex = Backbone.View.extend({
  template: JST['questions/index'],
  
  classname: 'questions-index',
  
  events:{
    "click .switch": "collectionSwitch"
  },
  
  initialize: function(options){
    this.collection = options.collection;
    
    this.listenTo(this.collection, "sync sort", this.render);

    this._tabName = '#top'

    this.infoShow = true;
  },
  
  
  render: function(){
    var content = this.template({
      questions: this.collection
    });
    
    this.$el.html(content);
    // $('nav-tabs > li').removeClass('active');
    $('li' + this._tabName).addClass('active');
    
    this.collection.each( function(question){
      var view = new PackOverflow.Views.QuestionIndexShow({
        model: question
      })
      $('.questionList').append($('<li>').html(view.render().$el))
    })

    if(this.infoShow){
      $(".info").removeClass('hidden');
    }

    var that = this;
    $(".closeButton").click(function(){
      $(this).parent().addClass("hidden");
      that.infoShow = false;
    });
    
    return this;
  },
  
  collectionSwitch: function(event) {
    // event listener - call the right 
    this._tabName = event.currentTarget.name;

    //-1 for descending.
    var switchHash = {
      '#top': [-1, 'sum_votes'],      
      '#new': [-1, 'created_at'],
      '#unanswered': [1, 'num_answers']
    };

    var multiplier = switchHash[this._tabName][0];
    var value = switchHash[this._tabName][1];

    this.collection.comparator = function(model) {
      if (typeof model.get(value) === 'string'){
        var date = Date.parse(model.get(value));
        return  multiplier * date;
      }else{
        return  multiplier * model.get(value);
      }
    };
    
    this.collection.sort();
  }
  
  
})