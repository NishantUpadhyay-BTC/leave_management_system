class CreateNotifications < ActiveRecord::Migration
  def change
    create_table :notifications do |t|
      t.belongs_to :user
      t.belongs_to :sign_off
      t.string :notification_type
      t.timestamps null: false
    end
  end
end
