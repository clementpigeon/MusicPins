class User < ActiveRecord::Base
  attr_accessible :email, :password, :username
  attr_reader :password

  validates :password_digest, :presence => { :message => "Password can't be blank" }
  validates :password, :length => { :minimum => 5, :allow_nil => true }
  validates :session_token, :presence => true
  validates :username, :presence => true
  validates :email, :presence => true

  has_many(
    :made_likes,
    class_name: 'Like',
    foreign_key: :user_id,
    primary_key: :id
  )

  has_many :pins

  has_many :likes
  has_many :liked_pins, through: :likes, source: :pin

  has_many :song_followings
  has_many :followed_songs, through: :song_followings, source: :song

  has_many :band_followings
  has_many :followed_bands, through: :band_followings, source: :band

  after_initialize :ensure_session_token

  def followed_songs_ids
    followed_songs.map {|song| song.id }
  end

  def followed_bands_ids
    followed_bands.map {|band| band.id }
  end

  def liked_pins_ids
    liked_pins.map {|pin| pin.id }
  end

    def self.find_by_credentials(username, password)
      user = User.find_by_username(username)

      return nil if user.nil?

      user.is_password?(password) ? user : nil
    end

    def self.generate_session_token
      SecureRandom::urlsafe_base64(16)
    end

    def is_password?(password)
      BCrypt::Password.new(self.password_digest).is_password?(password)
    end

    def password=(password)
      @password = password
      self.password_digest = BCrypt::Password.create(password)
    end

    def reset_session_token!
      self.session_token = self.class.generate_session_token
      self.save!
    end

    private
    def ensure_session_token
      self.session_token ||= self.class.generate_session_token
    end

end
