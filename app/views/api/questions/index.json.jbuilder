json.topQuestions @topQuestions do |question|
  json.extract! question, :id, :title, :body, :votes ,:sum_votes , :user_id, :num_answers, :created_at, :updated_at
  
  json.username question.user.username
end

json.newQuestions @newQuestions do |question|
  json.extract! question, :id, :title, :body, :votes ,:sum_votes , :user_id, :num_answers, :created_at, :updated_at
  
  json.username question.user.username
end

json.unansweredQuestions @unansweredQuestions do |question|
  json.extract! question, :id, :title, :body, :votes ,:sum_votes , :user_id, :num_answers, :created_at, :updated_at
  
  json.username question.user.username
end