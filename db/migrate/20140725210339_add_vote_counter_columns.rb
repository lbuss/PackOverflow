class AddVoteCounterColumns < ActiveRecord::Migration
  def change
    change_table :questions do |t|
      t.integer :vote_count
    end
    change_table :answers do |t|
      t.integer :vote_count
    end
    change_table :comments do |t|
      t.integer :vote_count
    end   
  end
end
