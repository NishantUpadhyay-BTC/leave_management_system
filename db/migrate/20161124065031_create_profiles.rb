class CreateProfiles < ActiveRecord::Migration
  def change
    create_table :profiles do |t|
      t.belongs_to :user
      t.date :joining_date
      t.integer :probation_period
      t.boolean :confirmation_status
      t.string :skills
      t.text :current_address
      t.text :permanent_address
      t.string :phone_number
      t.string :emergency_contact_number
      t.string :personal_email_id
      t.string :qualification
      t.string :education_institute
      t.text :certifications
      t.timestamps null: false
    end
  end
end
