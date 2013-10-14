class Song < ActiveRecord::Base
  attr_accessible :band_id, :mid, :title

  has_many :pins

  validates :band_id, :mid, :title, presence: true

  validates_uniqueness_of :mid

  belongs_to :band

  scope :mostPopular,
    select('songs.id, songs.title, songs.band_id, songs.mid, bands.name AS band_name, count(pins.id) AS pins_count')
    .joins(:pins)
    .group("songs.id, bands.id")
    .joins(:band)
    .order("pins_count DESC")

end
