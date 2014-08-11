class CreateAnswers < ActiveRecord::Migration
  def change
    create_table :answers do |t|
      t.text :body, null: false
      t.integer :votes
      t.integer :question_id
      t.integer :user_id, null: false
      
      t.timestamps
    end
    add_index :answers, :user_id
    add_index :answers, :question_id
  end
end
