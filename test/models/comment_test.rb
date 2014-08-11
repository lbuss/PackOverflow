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

require 'test_helper'

class CommentTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
