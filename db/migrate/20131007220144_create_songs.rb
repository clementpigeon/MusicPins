class CreateSongs < ActiveRecord::Migration
  def change
    create_table :songs do |t|
      t.string :mid, :null => false
      t.string :title, :null => false
      t.integer :band_id, :null => false

      t.timestamps
    end
    add_index :songs, :mid, :unique => true
    add_index :songs, :band_id
  end
end
