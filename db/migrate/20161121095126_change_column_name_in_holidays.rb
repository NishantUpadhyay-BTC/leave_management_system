class ChangeColumnNameInHolidays < ActiveRecord::Migration
  def change
    remove_column :holidays, :description
    add_column :holidays, :name, :string
  end
end
