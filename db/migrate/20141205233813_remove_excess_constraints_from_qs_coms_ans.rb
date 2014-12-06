class RemoveExcessConstraintsFromQsComsAns < ActiveRecord::Migration
  def change
  	change_column :questions, :user_id, :integer, :null => true
  	change_column :comments, :user_id, :integer, :null => true
  	change_column :answers, :user_id, :integer, :null => true
  end
end
