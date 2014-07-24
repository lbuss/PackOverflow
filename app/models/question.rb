class Question < ActiveRecord::Base
  validates :title, :user, presence: true
  
  has_many :answers
  belongs_to :user
  
end
