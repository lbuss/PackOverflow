class Question < ActiveRecord::Base
  validates :title, :user, presence: true
  
  belongs_to :user
  
end
