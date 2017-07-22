class CreateProfiles < ActiveRecord::Migration[5.1]
  def change
    create_table :profiles do |t|
      t.string :firstname
      t.string :lastname

      t.timestamps
    end
  end
end
