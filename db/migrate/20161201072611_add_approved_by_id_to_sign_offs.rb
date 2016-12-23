class AddApprovedByIdToSignOffs < ActiveRecord::Migration
  def change
    add_column :sign_offs, :approved_rejected_by_id, :integer
  end
end
