class Band < ActiveRecord::Base
  attr_accessible :mid, :name, :twitter_id, :facebook_id

  validates :mid, :name, presence: true

  validates_uniqueness_of :mid

  has_many(:songs, class_name: "Song", foreign_key: :band_id, primary_key: :id)
  has_many :pins, through: :songs, source: :pins

end
