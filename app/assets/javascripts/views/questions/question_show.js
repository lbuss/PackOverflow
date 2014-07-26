PackOverflow.Views.QuestionShow = Backbone.CompositeView.extend({
  template: JST['questions/show'],
  
  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.collection, "sync", this.render);
    this.listenTo(this.model.comments(), "sync", this.render);
    
    var voteBox = new PackOverflow.Views.VoteShow({ type: 'Question', model: this.model });
    this.addSubview("#questionVoteBox", voteBox);
    var answerForm = new PackOverflow.Views.AnswerForm({model: this.model});
    this.addSubview("#answerForm", answerForm);
    var commentForm = new PackOverflow.Views.CommentForm({type: 'Question', model: this.model});
    this.addSubview("#questionCommentForm", commentForm);
  },
  
  render: function() {
    var content = this.template({
      question: this.model
    });
    this.$el.html(content);
    
    this.model.comments().each( function(comment) {
      var Cview = new PackOverflow.Views.CommentShow({
        model: comment
      });
      $('#questionCommentList').append(Cview.render().$el);
    });
    
    this.collection.each( function(answer) {
      var Aview = new PackOverflow.Views.AnswerShow({
        model: answer,
        collection: answer.comments()
      });
      $('.answerList').append($('<li>').html(Aview.render().$el));
    });
    

    this.attachSubviews();
    return this;
  }
});