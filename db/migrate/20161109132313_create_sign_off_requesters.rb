class CreateSignOffRequesters < ActiveRecord::Migration
  def change
    create_table :sign_off_requesters do |t|
      t.integer :user_id
      t.integer :sign_off_id
      t.timestamps null: false
    end
  end
end
