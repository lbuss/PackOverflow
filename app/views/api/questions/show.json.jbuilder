json.extract! @question, :id, :title, :body, :votes ,:sum_votes, :user_id, :created_at, :updated_at

if !@question.user
  json.username "Guest"
else
  json.username @question.user.username
end
# json.votes @question.votes do |vote|
#   json.extract! vote, :user_id, :value
# end

json.comments @comments.select(){|c| c.commentable_id == @question.id && c.commentable_type == 'Question'} do |comment|
  json.extract! comment, :id, :user_id, :body, :votes, :sum_votes, :created_at, :updated_at

  if !comment.user
      json.username "Guest"
  else
    json.username comment.user.username
  end
  # json.votes comment.votes do |vote|
#     json.extract! vote, :user_id, :value
#   end
end

json.answers @answers do |answer|
  json.extract! answer, :id, :body, :votes, :sum_votes, :user_id, :created_at, :updated_at
  
  if !answer.user
    json.username "Guest"
  else
    json.username answer.user.username
  end
  # json.votes answer.votes do |vote|
#     json.extract! vote, :user_id, :value
#   end
 
  json.comments @comments.select(){ |c| c.commentable_id == answer.id && c.commentable_type == 'Answer'} do |comment|
    json.extract! comment, :id, :body, :votes, :sum_votes, :user_id, :created_at, :updated_at
    
    if !comment.user
      json.username "Guest"
    else
      json.username comment.user.username
    end
    # json.votes comment.votes do |vote|
   #    json.extract! vote, :user_id, :value
   #  end
  end
end