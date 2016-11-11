class CreateSignOffTypes < ActiveRecord::Migration
  def change
    create_table :sign_off_types do |t|
      t.string :sign_off_type_name
      t.integer :no_of_days
      t.string :description
      t.timestamps null: false
    end
  end
end
