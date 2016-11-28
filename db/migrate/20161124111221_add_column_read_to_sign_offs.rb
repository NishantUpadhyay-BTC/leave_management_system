class AddColumnReadToSignOffs < ActiveRecord::Migration
  def change
    add_column :sign_offs, :read, :boolean, default: true
  end
end
