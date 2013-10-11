class SongFollowing < ActiveRecord::Base
  attr_accessible :user_id, :song_id
  belongs_to :user
  belongs_to :song

  validates :user_id, :song_id, presence: true

  validates :user_id, uniqueness: {scope: :song_id }

end
