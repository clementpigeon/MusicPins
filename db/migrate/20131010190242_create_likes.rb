class CreateLikes < ActiveRecord::Migration
  def change
    create_table :likes do |t|
      t.references :user, :null => false
      t.references :pin, :null => false

      t.timestamps
    end
    add_index :likes, :user_id
    add_index :likes, :pin_id
  end
end
