class AddColumnDescriptionInLeave < ActiveRecord::Migration
  def change
    add_column :sign_offs, :description, :text
  end
end
