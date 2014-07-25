PackOverflow.Views.AnswerShow = Backbone.CompositeView.extend({
  template: JST['answers/show'],
  
  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
    
    var CommentNewView = new PackOverflow.Views.CommentForm({type: 'Answer', model: this.model});
    this.addSubview(".commentList", CommentNewView);
  },
  
  render: function() {
    var content = this.template({
      answer: this.model
    });
    this.$el.html(content);
    
    var that = this;
    this.model.comments().each(function(comment) {
      Cview = new PackOverflow.Views.CommentShow({
        model: comment
      });
      that.$el.find('.commentList').append($('<li>').html(Cview.render().$el));
    })
    
    this.attachSubviews();
    return this;
  }
});