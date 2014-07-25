PackOverflow.Views.QuestionShow = Backbone.CompositeView.extend({
  template: JST['questions/show'],
  
  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.answers(), "sync add", this.render);
    
    var answerForm = new PackOverflow.Views.AnswerForm({model: this.model});
    this.addSubview(".frm", answerForm);
    var CommentNewView = new PackOverflow.Views.CommentForm({type: 'Question', model: this.model});
    this.addSubview(".cList", CommentNewView);
    C  = CommentNewView;
    Q = this;
  },
  
  render: function() {
    var content = this.template({
      question: this.model
    });
    this.$el.html(content);
    
    this.collection.each( function(answer) {
      Aview = new PackOverflow.Views.AnswerShow({
        model: answer
      });
      $('.answerList').append($('<li>').html(Aview.render().$el));
    })
    

    this.attachSubviews();
    return this;
  }
});