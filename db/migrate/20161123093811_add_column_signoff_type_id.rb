class AddColumnSignoffTypeId < ActiveRecord::Migration
  def change
    remove_column :sign_offs, :sign_off_type
    add_column :sign_offs, :sign_off_type_id, :integer
  end
end
