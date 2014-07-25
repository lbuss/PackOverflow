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
    debugger
    var params = $(event.currentTarget).serializeJSON();
    params.comment.commentable_type = this.type;
    params.comment.commentable_id = this.model.id;
    
    var newComment = new PackOverflow.Models.Comment(params["comment"]);
    var that = this;
    newComment.save({}, {
      success: function() {
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