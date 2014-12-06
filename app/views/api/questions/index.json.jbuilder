json.topQuestions @topQuestions do |question|
  json.extract! question, :id, :title, :body, :votes ,:sum_votes , :user_id, :num_answers, :created_at, :updated_at
  
  if !question.user
  	json.username "Guest"
  else
  	json.username question.user.username
  end
end

json.newQuestions @newQuestions do |question|
  json.extract! question, :id, :title, :body, :votes ,:sum_votes , :user_id, :num_answers, :created_at, :updated_at
  
  if !question.user
  	json.username "Guest"
  else
  	json.username question.user.username
  end
end

json.unansweredQuestions @unansweredQuestions do |question|
  json.extract! question, :id, :title, :body, :votes ,:sum_votes , :user_id, :num_answers, :created_at, :updated_at
  
  if !question.user
  	json.username "Guest"
  else
  	json.username question.user.username
  end
end