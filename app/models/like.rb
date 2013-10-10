class Like < ActiveRecord::Base
  attr_accessible :user_id, :pin_id

  belongs_to :user
  belongs_to :pin

  validates :user_id, uniqueness: {scope: :pin_id}

end
