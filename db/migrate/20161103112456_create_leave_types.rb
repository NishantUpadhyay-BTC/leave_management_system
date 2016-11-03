class CreateLeaveTypes < ActiveRecord::Migration
  def change
    create_table :leave_types do |t|
      t.string :leave_type_name
      t.integer :no_of_days
      t.string :description
      t.timestamps null: false
    end
  end
end
