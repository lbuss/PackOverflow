class Answer < ActiveRecord::Base
  validates :user, presence: true
  
  belongs_to :user
  belongs_to :question
  
end
