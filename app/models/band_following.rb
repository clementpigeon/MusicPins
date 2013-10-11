class BandFollowing < ActiveRecord::Base
  attr_accessible :user_id, :band_id
  belongs_to :user
  belongs_to :band

  validates :user_id, :band_id, presence: true

  validates :user_id, uniqueness: {scope: :band_id }

end
