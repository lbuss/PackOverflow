# == Schema Information
#
# Table name: comments
#
#  id               :integer          not null, primary key
#  body             :text             not null
#  votes            :integer
#  commentable_id   :integer
#  commentable_type :string(255)
#  user_id          :integer          not null
#  created_at       :datetime
#  updated_at       :datetime
#

class Comment < ActiveRecord::Base
  validates :body, :commentable_id, :commentable_type, presence: true
  
  belongs_to :commentable, polymorphic: true
  belongs_to :user
  
end
