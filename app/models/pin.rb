class Pin < ActiveRecord::Base
  attr_accessible :user_id, :link, :responds_to_id, :song_id, :text, :pin_type

  belongs_to :user
  belongs_to :song
  has_one :band, through: :song
  has_many :comments
  has_many :likes

  before_validation :default_pin_type

  validates :user_id, :song_id, :pin_type, presence: true



  def default_pin_type
    if self.pin_type.nil?
      self.pin_type = 0
    end
  end



end
