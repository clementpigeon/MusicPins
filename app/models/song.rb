class Song < ActiveRecord::Base
  attr_accessible :band_id, :mid, :title

  has_many(:pins, class_name: :name, foreign_key: :song_id, primary_key: :id)

  validates :band_id, :mid, :title, presence: true

  validates_uniqueness_of :mid

end
