class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.text :body, null: false
      t.integer :votes
      t.references :commentable, polymorphic: true
      t.integer :user_id, null: false
      
      t.timestamps
    end
    
    add_index :comments, :user_id
    add_index :comments, :commentable_id
    add_index :comments, :commentable_type
  end
end
