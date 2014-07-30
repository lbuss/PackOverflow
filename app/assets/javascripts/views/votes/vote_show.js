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
  
  render: function(tempOn) {

    var content = this.formTemplate({
      thing: this.model
    });
    
    this.$el.html(content);
    
    var that = this;
    
    if (tempOn === 1){
      that.$el.find('.upvote').addClass('on');
    } else if(tempOn === -1){
      that.$el.find('.downvote').addClass('on');
    } else {
      this.model.votes().each( function(vote){
        if(vote.get('user_id') === window.currentUser.id){
          var value = vote.get('value');
          if (value === 1){
            that.$el.find('.upvote').addClass('on');
          } else {
            that.$el.find('.downvote').addClass('on');
          }
        }
      })
    }
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
        that.model.sumVotes += value;
        that.render(value);
      }
    })
  }
});