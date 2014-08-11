PackOverflow.Views.CommentForm = Backbone.View.extend({
  template: JST['comments/form'],
  
  initialize: function(options) {
    this.type = options.type;
  },
  
  events: {
    "submit form": "submit"
  },
  
  submit: function(event){
    event.preventDefault();
    
    var $form = $(event.currentTarget);
    var params = $form.serializeJSON();
    params.comment.commentable_type = this.type;
    params.comment.commentable_id = this.model.id;
    
    var newComment = new PackOverflow.Models.Comment(params["comment"]);
    var that = this;
    newComment.save({}, {
      success: function() {
        $form[0].reset();
        that.model.comments().add(newComment);
      }
    })
  },
  
  render: function () {
      var content = this.template();
      this.$el.html(content);
      return this;
  }
  
});