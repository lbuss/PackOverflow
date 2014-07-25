json.extract! @question, :id, :title, :body, :created_at, :updated_at

json.comments @question.comments do |comment|
  json.id comment.user_id
  json.email comment.body
end

json.answers @question.answers do |answer|
  json.extract! answer, :id, :body, :created_at, :updated_at

  json.comments answer.comments do |comments|
    json.extract! comments, :id, :body, :created_at, :updated_at
  end
end