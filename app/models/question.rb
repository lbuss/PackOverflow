class Question < ActiveRecord::Base
  validates :title, :user, :body, presence: true
  
  has_many :comments, as: :commentable
  has_many :answers
  
  belongs_to :user
  
end
