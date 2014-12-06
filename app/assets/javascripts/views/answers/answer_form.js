PackOverflow.Views.AnswerForm = Backbone.CompositeView.extend({
  template: JST['answers/form'],
  formTemplate: JST['wysiwyg/form'],
  
  events: {
    "submit form": "submit"
  },
  
  submit: function(event){
    event.preventDefault();
    var $form = $(event.currentTarget);
    var params = $form.serializeJSON();
    params['answer']['body']=$('#editor').html();
    
    var newAnswer = new PackOverflow.Models.Answer(params["answer"]);
    var that = this;
    newAnswer.save({}, {
      success: function() {
        $form[0].reset();
        newAnswer.username = window.currentUser.username || "Guest";
        that.model.answers().add(newAnswer);
        Backbone.history.navigate("/questions/"+newAnswer.get("question_id"), {trigger:true});
      }
    })
  },
  
  render: function () {
      var content = this.template({
        question: this.model
      });
      var wmdForm = this.formTemplate();
      this.$el.html(content);
      this.$el.find(".wmdInsert").html(wmdForm);
      return this;
  }
  
});