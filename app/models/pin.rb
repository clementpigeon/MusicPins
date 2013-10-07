class Pin < ActiveRecord::Base
  attr_accessible :user_id, :link, :responds_to_id, :song_id, :text, :type

  belongs_to :user

  before_validation :default_type

  validates :user_id, :song_id, :type, presence: true


  def default_type
    if type.nil?
      type = 0
    end
  end



end
