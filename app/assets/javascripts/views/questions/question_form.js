PackOverflow.Views.QuestionForm = Backbone.View.extend({
  template: JST['questions/form'],
  formTemplate: JST['wysiwyg/form'],
  
  events: {
    "submit form": "submit"
  },
  
  submit: function(event){
    event.preventDefault();
    
    var params = $(event.currentTarget).serializeJSON();
    params['question']['body']=$('#editor').html();
    
    var newQuestion = new PackOverflow.Models.Question(params["question"]);
    var that = this;
    newQuestion.save({}, {
      success: function() {
        PackOverflow.Collections.questions.add(newQuestion);
        Backbone.history.navigate("/questions/"+newQuestion.get("id"), {trigger:true});
      }
    })
  },
  
  render: function () {
      var content = this.template();
      var wmdForm = this.formTemplate();
      this.$el.html(content);
      this.$el.find(".wmdInsert").html(wmdForm);
      return this;
  }
  
});