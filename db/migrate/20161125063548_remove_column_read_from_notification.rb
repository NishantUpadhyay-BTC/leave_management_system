class RemoveColumnReadFromNotification < ActiveRecord::Migration
  def change
    remove_column :sign_offs, :read
  end
end
