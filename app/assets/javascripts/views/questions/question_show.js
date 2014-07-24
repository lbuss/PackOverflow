PackOverflow.Views.QuestionShow = Backbone.CompositeView.extend({
  template: JST['questions/show'],
  
  initialize: function() {
    this.collection = this.model.answers();
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.answers(), "sync add", this.render);
    var answerForm = new PackOverflow.Views.AnswerForm({model: this.model});
    this.addSubview(".form", answerForm);
  },
  
  render: function() {
    var content = this.template({
      question: this.model
    });
    this.$el.html(content);
    
    this.model.answers().each( function(answer) {
      Aview = new PackOverflow.Views.AnswerShow({
        model: answer
      });
      $('.answerList').append($('<li>').html(Aview.render().$el));
    })
    

    this.attachSubviews();
    return this;
  }
});