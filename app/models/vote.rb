class Vote < ActiveRecord::Base
  validates :user_id, :votable_id, :votable_type, presence: true
  
  belongs_to :votable, polymorphic: true, counter_cache: :vote_count
  belongs_to :user
end
