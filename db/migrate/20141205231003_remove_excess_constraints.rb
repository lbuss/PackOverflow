class RemoveExcessConstraints < ActiveRecord::Migration
  def change
  	change_column :users, :username, :string, :null => true
  	change_column :users, :email, :string, :null => true
  	change_column :users, :password_digest, :string, :null => true
  end
end
