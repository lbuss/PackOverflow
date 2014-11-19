PackOverflow.Views.VoteShow = Backbone.View.extend({
  tagName: 'p',
  
  formTemplate: JST['votes/form'],
  showTemplate: JST['votes/show'],
  
  initialize: function(options) {
    this.type = options.type;
    this.model = options.model;
    var that = this;
    this.listenTo(this.model, "sync", that.render);
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
    var voteVal = 0;

    this.model.votes().each( function(vote){
      if(vote.get('user_id') === window.currentUser.id){
        voteVal = vote.get('value');
        return false;
      }
    })

    that.$el.find('.voteNumbers').html(parseInt(this.$el.find('.voteNumbers').html()));

    if (voteVal === 1){
      that.$el.find('.upvote').addClass('on');
      that.$el.find('.downvote').removeClass('on');
    } else if(voteVal === -1) {
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

    var votes = this.model.attributes.sum_votes;
    var newVote;
    var that = this;
    var tempVote = 0;


    this.model.votes().each( function(vote){
      if(vote.get('user_id') === window.currentUser.id){

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
      that.model.attributes.sum_votes = votes + value;
      tempVote = value;
      newVote = new PackOverflow.Models.Vote({
          votable_type: this.type,
          votable_id: this.model.id,
          value: value,
          user_id: window.currentUser.id
      });
      this.model.votes().push(newVote);
    }

    newVote.save({}, {
      success: function(resp) {
        if(!newVote.attributes.id){
          that.model.votes().models[that.model.votes().models.length -1] = resp;
        }
        that.render();
      },
    })
  }
});