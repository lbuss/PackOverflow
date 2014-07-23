PackOverflow.Views.questionForm = Backbone.View.extend({
  template: JST['questions/form'],
  
  create: function(event){
    event.preventDefault();
    
    this.collection.create({
      title: this.$('#title').val(),
      body: this.$('#body').val()
    }, {wait: true});
  },
  
  render: function () {
      var content = this.template;
      this.$el.html(content);
      return this;
  }
  
});