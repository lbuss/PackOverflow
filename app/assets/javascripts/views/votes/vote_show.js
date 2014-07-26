PackOverflow.Views.VoteShow = Backbone.View.extend({
  tagName: 'p',
  
  formTemplate: JST['votes/form'],
  showTemplate: JST['votes/show'],
  
  initialize: function(options) {
    this.type = options.type;
    this.model = options.model;
    this.listenTo(this.model, "sync", this.render);
  },
  
  events: {
   "click .upvote": "upvote",
   "click .downvote": "downvote"
  },
  
  render: function() {
    if (false) {
      var content = this.showTemplate({
        thing: this.model
      });
    } else {
      var content = this.formTemplate({
        thing: this.model
      });
    }
    
    this.$el.html(content);

    return this;
  },
  
  upvote: function(){
    this.vote( 1);
  },
  
  downvote: function(){
    this.vote(-1);
  },
  
  vote: function(value){
    event.preventDefault();
    var newVote = new PackOverflow.Models.Vote({
      vote:{
        votable_type: this.type,
        votable_id: this.model.id,
        value: value
      }
    });
    
    var that = this;
    newVote.save({}, {
      success: function() {
        that.model.sumVotes += 1;
        that.render();
      }
    })
  }
});