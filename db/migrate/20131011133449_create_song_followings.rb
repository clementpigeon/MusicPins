class CreateSongFollowings < ActiveRecord::Migration
  def change
    create_table :song_followings do |t|
      t.references :user
      t.references :song

      t.timestamps
    end
    add_index :song_followings, :user_id
    add_index :song_followings, :song_id
  end
end
