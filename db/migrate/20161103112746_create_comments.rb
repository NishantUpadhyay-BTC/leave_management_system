class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.integer :leave_id
      t.integer :user_id
      t.integer :sender_id
      t.integer :receiver_id
      t.string :description
      t.timestamps null: false
    end
  end
end
