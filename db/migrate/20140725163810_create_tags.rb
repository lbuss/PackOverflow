class CreateTags < ActiveRecord::Migration
  def change
    create_table :tags do |t|
      t.integer :user_id, null: false
      t.integer :answer_id, null: false
      t.string :body, null: false
      t.timestamps
    end
    
    add_index :tags, :body
    add_index :tags, :answer_id
  end
end
