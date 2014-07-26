class CreateVotes < ActiveRecord::Migration
  def change
    create_table :votes do |t|
      t.integer :value
      t.references :votable, polymorphic: true
      t.integer :user_id, null: false
      
      t.timestamps
    end
    
    add_index :votes, :user_id
    add_index :votes, :votable_id
    add_index :votes, :votable_type
  end
end
