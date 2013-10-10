class Comment < ActiveRecord::Base
  attr_accessible :user_id, :pin_id, :body

  belongs_to :user
  belongs_to :pin

  validates :user_id, :pin_id, :body, presence: true

end
