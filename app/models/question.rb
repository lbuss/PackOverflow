# == Schema Information
#
# Table name: questions
#
#  id         :integer          not null, primary key
#  title      :string(255)      not null
#  body       :text             not null
#  votes      :integer
#  answer_id  :integer
#  user_id    :integer          not null
#  created_at :datetime
#  updated_at :datetime
#

class Question < ActiveRecord::Base
  validates :title, :user, :body, presence: true
  
  has_many :comments, as: :commentable
  has_many :answers
  has_many :tags
  
  belongs_to :user
  
end
