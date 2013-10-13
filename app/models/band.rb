class Band < ActiveRecord::Base
  attr_accessible :mid, :name, :twitter_id, :facebook_id

  validates :mid, :name, presence: true

  validates_uniqueness_of :mid

  has_many :songs
  has_many :pins, through: :songs, source: :pins

  scope :mostPopular,
    select('bands.id, bands.name, count(pins.id) AS pins_count')
    .joins(:pins)
    .group("bands.id")
    .order("pins_count DESC")

end
