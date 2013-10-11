class BandFollowing < ActiveRecord::Base
  attr_accessible :user_id, :band_id
  belongs_to :user
  belongs_to :band

end
