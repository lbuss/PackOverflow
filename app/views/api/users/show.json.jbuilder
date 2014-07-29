json.extract! @user, :id, :username, :email, :created_at, :updated_at do

  json.questions @questions.select(){|c| c.user_id == @user.id} do |question|
    json.extract! question, :id, :user_id, :title, :body, :votes, :sumVotes, :created_at, :updated_at
  end
  
  #question_id below indicates parent question
  
  json.answers @answers.select(){|c| c.user_id == @user.id} do |answer|
    json.extract! answer, :id, :user_id, :body, :votes, :sumVotes, :created_at, :updated_at
  end
  
  json.comments @comments.select(){|c| c.user_id == @user.id} do |comment|
    json.extract! comment, :id, :user_id, :body, :votes, :sumVotes, :created_at, :updated_at
  end
  
end