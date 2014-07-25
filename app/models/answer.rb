class Answer < ActiveRecord::Base
  validates :user, :body, presence: true
  
  has_many :comments, as: :commentable
  
  belongs_to :user
  belongs_to :question
  
end
