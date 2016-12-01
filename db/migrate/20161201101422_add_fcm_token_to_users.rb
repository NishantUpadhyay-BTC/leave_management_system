class AddFcmTokenToUsers < ActiveRecord::Migration
  def change
    add_column :users, :fcm_token, :text
  end
end
