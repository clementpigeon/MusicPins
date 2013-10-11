class CreateBandFollowings < ActiveRecord::Migration
  def change
    create_table :band_followings do |t|
      t.references :user, null: false
      t.references :band, null: false

      t.timestamps
    end
    add_index :band_followings, :user_id
    add_index :band_followings, :band_id
  end
end
