PackOverflow.Views.AnswerForm = Backbone.CompositeView.extend({
  template: JST['answers/form'],
  
  events: {
    "submit form": "submit"
  },
  
  submit: function(event){
    event.preventDefault();
    var $form = $(event.currentTarget);
    var params = $form.serializeJSON();
    
    var newAnswer = new PackOverflow.Models.Answer(params["answer"]);
    var that = this;
    newAnswer.save({}, {
      success: function() {
        $form[0].reset();
        that.model.answers().add(newAnswer);
        Backbone.history.navigate("/questions/"+newAnswer.get("question_id"), {trigger:true});
      }
    })
  },
  
  render: function () {
      var content = this.template({
        question: this.model
      });
      this.$el.html(content);
      return this;
  }
  
});