json.extract! @question, :id, :title, :body, :votes ,:sum_votes, :user_id, :created_at, :updated_at

json.username @question.user.username
# json.votes @question.votes do |vote|
#   json.extract! vote, :user_id, :value
# end

json.comments @comments.select(){|c| c.commentable_id == @question.id && c.commentable_type == 'Question'} do |comment|
  json.extract! comment, :id, :user_id, :body, :votes, :sum_votes, :created_at, :updated_at
  json.username comment.user.username
  # json.votes comment.votes do |vote|
#     json.extract! vote, :user_id, :value
#   end
end

json.answers @answers do |answer|
  json.extract! answer, :id, :body, :votes, :sum_votes, :user_id, :created_at, :updated_at
  
  json.username answer.user.username
  # json.votes answer.votes do |vote|
#     json.extract! vote, :user_id, :value
#   end
 
  json.comments @comments.select(){ |c| c.commentable_id == answer.id && c.commentable_type == 'Answer'} do |comment|
    json.extract! comment, :id, :body, :votes, :sum_votes, :user_id, :created_at, :updated_at
    
    json.username comment.user.username
    # json.votes comment.votes do |vote|
   #    json.extract! vote, :user_id, :value
   #  end
  end
end