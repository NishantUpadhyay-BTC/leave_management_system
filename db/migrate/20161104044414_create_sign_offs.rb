class CreateSignOffs < ActiveRecord::Migration
  def change
    create_table :sign_offs do |t|
      t.integer :user_id
      t.integer :leave_type_id
      t.string :half_full_leave
      t.string :leave_status
      t.date :date_from
      t.date :date_to
      t.integer :leave_days
      t.string :reason
      t.timestamps null: false
    end
  end
end
