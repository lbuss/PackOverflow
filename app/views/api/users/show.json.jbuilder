json.extract! @user, :id, :username, :email, :created_at, :updated_at

json.questions do
  json.topQuestions @topQuestions do |question|
    json.extract! question, :id, :user_id, :title, :body, :votes, :sum_votes, :created_at, :updated_at
    
    json.username @user.username
  end
  
  json.newQuestions @newQuestions do |question|
    json.extract! question, :id, :user_id, :title, :body, :votes, :sum_votes, :created_at, :updated_at
    
    json.username @user.username
  end
end

json.answers do
  json.topAnswers @topAnswers do |answer|
    json.extract! answer, :id, :user_id, :body, :votes, :question_id, :sum_votes, :created_at, :updated_at
  end
  
  json.newAnswers @newAnswers do |answer|
    json.extract! answer, :id, :user_id, :body, :votes, :question_id, :sum_votes, :created_at, :updated_at
  end
end

# json.comments @comments.select(){|c| c.user_id == @user.id} do |comment|
#   json.extract! comment, :id, :user_id, :body, :votes, :sumVotes, :created_at, :updated_at
# end
  