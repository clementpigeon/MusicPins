class CreateBands < ActiveRecord::Migration
  def change
    create_table :bands do |t|
      t.string :name, :null => false
      t.string :mid, :null => false
      t.string :twitter_id
      t.string :facebook_id

      t.timestamps
    end
    add_index :bands, :mid, :unique => true
  end
end
