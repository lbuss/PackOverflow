json.topQuestions @topQuestions do |question|
  json.extract! question, :id, :title, :body, :votes ,:sumVotes, :user_id, :username, :numAnswers, :created_at, :updated_at
end

json.newQuestions @newQuestions do |question|
  json.extract! question, :id, :title, :body, :votes ,:sumVotes, :user_id, :username, :numAnswers, :created_at, :updated_at
end

json.unansweredQuestions @unansweredQuestions do |question|
  json.extract! question, :id, :title, :body, :votes ,:sumVotes, :user_id, :username, :numAnswers, :created_at, :updated_at
end