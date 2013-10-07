class CreatePins < ActiveRecord::Migration
  def change
    create_table :pins do |t|
      t.integer :song_id, :null => false
      t.references :user, :null => false
      t.integer :pin_type, :null => false
      t.text :text
      t.string :link
      t.integer :responds_to_id

      t.timestamps
    end
    add_index :pins, :song_id
    add_index :pins, :user_id
  end
end
