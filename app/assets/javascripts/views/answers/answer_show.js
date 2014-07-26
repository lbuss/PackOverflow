PackOverflow.Views.AnswerShow = Backbone.CompositeView.extend({
  template: JST['answers/show'],
  
  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.collection, "sync", this.render);
    this.listenTo(this.collection, "add", this.update);
    
    var answerVoteBox = new PackOverflow.Views.VoteShow({type:'Answer', model: this.model});
    this.addSubview(".answerVoteBox", answerVoteBox);
    
    var answerCommentForm = new PackOverflow.Views.CommentForm({type: 'Answer', model: this.model});
    this.addSubview(".commentForm", answerCommentForm);
    
    var that = this;
    this.collection.each(function(comment) {
      that.addCommentView(comment);
    })
  },
  
  render: function() {
    var content = this.template({
      answer: this.model
    });
    this.$el.html(content);
    
    this.attachSubviews();
    return this;
  },
  
  update: function(event) {
    this.addCommentView(event);
    this.render();
  },
  
  addCommentView: function(comment){
    var newComment = new PackOverflow.Views.CommentShow({ model: comment });
    this.addSubview(".answerCommentList", newComment); 
  }
});