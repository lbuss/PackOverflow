json.extract! @user, :id, :username, :email, :created_at, :updated_at

json.questions @questions do |question|
  json.extract! question, :id, :user_id, :title, :body, :votes, :sumVotes, :created_at, :updated_at
end

json.answers @answers do |answer|
  json.extract! answer, :id, :user_id, :body, :votes, :sumVotes, :created_at, :updated_at
end

# json.comments @comments.select(){|c| c.user_id == @user.id} do |comment|
#   json.extract! comment, :id, :user_id, :body, :votes, :sumVotes, :created_at, :updated_at
# end
  