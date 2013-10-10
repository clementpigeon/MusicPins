class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.references :user, null: false
      t.references :pin, null: false
      t.text :body, null: false

      t.timestamps
    end
    add_index :comments, :user_id
    add_index :comments, :pin_id
  end
end
