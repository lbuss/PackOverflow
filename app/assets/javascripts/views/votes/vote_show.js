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

    var content = this.formTemplate({
      thing: this.model
    });
    
    this.$el.html(content);
    
    var that = this;
    var prevVoteVal = 0;

    this.model.votes().each( function(vote){
      if(vote.get('user_id') === window.currentUser.id){
        prevVoteVal = vote.get('value');
        return false;
      }
    })

    if (prevVoteVal === 1){
      that.$el.find('.upvote').addClass('on');
      that.$el.find('.downvote').removeClass('on');
    } else if(prevVoteVal === -1) {
      that.$el.find('.downvote').addClass('on');
      that.$el.find('.upvote').removeClass('on');
    } else {
      that.$el.find('.downvote').removeClass('on');
      that.$el.find('.upvote').removeClass('on');
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

    var newVote;
    var that = this;


    this.model.votes().each( function(vote){
      if(vote.get('user_id') === window.currentUser.id){
        var votes = that.model.attributes.sum_votes;

        if (vote.get('value') === value){
          that.model.attributes.sum_votes = votes - value;
          vote.attributes.value = 0;
          newVote = vote;
        } else {
          that.model.attributes.sum_votes = votes + value - vote.get('value');
          vote.attributes.value = value;
          newVote = vote;
        }
        
        return false;
      }
    });

    if( !newVote ){
      newVote = new PackOverflow.Models.Vote({
        vote:{
          votable_type: this.type,
          votable_id: this.model.id,
          value: value
        }
      });
      voteChangeVal = value;
    }

    var that = this;
    newVote.save({}, {
      success: function() {
        that.render();
      }
    })
  }
});