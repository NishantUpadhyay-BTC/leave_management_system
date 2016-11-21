class UpdateUserRoleColumns < ActiveRecord::Migration
  def change
    add_column :roles, :user_id, :integer
    remove_column :users, :role_id
  end
end
