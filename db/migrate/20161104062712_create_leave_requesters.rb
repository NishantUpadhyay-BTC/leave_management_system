class CreateLeaveRequesters < ActiveRecord::Migration
  def change
    create_table :leave_requesters do |t|
      t.integer :sign_off_id
      t.integer :user_id
      t.timestamps null: false
    end
  end
end
