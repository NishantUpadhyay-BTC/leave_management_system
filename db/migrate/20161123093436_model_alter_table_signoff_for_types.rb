class ModelAlterTableSignoffForTypes < ActiveRecord::Migration
  def change
    remove_column :sign_offs, :sign_off_type_id
    remove_column :sign_offs, :half_full_leave
    remove_column :sign_offs, :sign_off_status
    remove_column :sign_offs, :leave_days
    add_column :sign_offs, :sign_off_type, :string
    add_column :sign_offs, :sign_off_status, :string
    add_column :sign_offs, :half_full_leave, :string
  end
end
