class RenameColumnDescriptionInComment < ActiveRecord::Migration
  def change
    remove_column :comments, :description
    add_column :comments, :message, :text
  end
end
