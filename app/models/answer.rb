# == Schema Information
#
# Table name: answers
#
#  id          :integer          not null, primary key
#  body        :text             not null
#  votes       :integer
#  question_id :integer
#  user_id     :integer          not null
#  created_at  :datetime
#  updated_at  :datetime
#

class Answer < ActiveRecord::Base
  
  validates :user, :body, presence: true
  
  has_many :votes, as: :votable
  has_many :comments, as: :commentable
  
  belongs_to :user
  belongs_to :question
  
end
