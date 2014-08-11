class CreateQuestions < ActiveRecord::Migration
  def change
    create_table :questions do |t|
      t.string :title, null: false
      t.text :body, null: false
      t.integer :votes
      t.integer :answer_id
      t.integer :user_id, null: false
      
      t.timestamps
    end
    add_index :questions, :user_id
    add_index :questions, :title
  end
end
