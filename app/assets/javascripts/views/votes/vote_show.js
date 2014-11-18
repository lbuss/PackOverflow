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
    
    if (tempOn > 0){
      that.$el.find('.upvote').addClass('on');
      that.$el.find('.downvote').removeClass('on');
      that.$el.find('.voteNumbers').html(parseInt(this.$el.find('.voteNumbers').html())+1);
    } else if(tempOn < 0){
      that.$el.find('.downvote').addClass('on');
      that.$el.find('.voteNumbers').html(parseInt(this.$el.find('.voteNumbers').html())-1);
      that.$el.find('.upvote').removeClass('on');
    } else {
      this.model.votes().each( function(vote){
        if(vote.get('user_id') === window.currentUser.id){
          var value = vote.get('value');
          if (value === 1){
            that.$el.find('.upvote').addClass('on');
            that.$el.find('.downvote').removeClass('on');
          } else if(value === -1) {
            that.$el.find('.downvote').addClass('on');
            that.$el.find('.upvote').removeClass('on');
          }
          return false;
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

    var newVote;

    this.model.votes().each( function(vote){
      if(vote.get('user_id') === window.currentUser.id){
        if (vote.get('value') != value){
          newVote = vote;
          newVote.attributes.value = value;
          value = value * 2;
        } else {
          newVote = vote;
          newVote.attributes.value = 0;
          value = 0;
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
    }

    var that = this;
    newVote.save({}, {
      success: function() {
        that.render(value);
      }
    })
  }
});