# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  username        :string(255)      not null
#  email           :string(255)      not null
#  password_digest :string(255)      not null
#  session_token   :string(255)
#  gravatar_url    :string(255)
#  created_at      :datetime
#  updated_at      :datetime
#

class User < ActiveRecord::Base
  validates_presence_of :username, :email, :password_digest
  validates_uniqueness_of :username, allow_blank: true

  validates :session_token, presence: true

  has_many :votes
  has_many :questions
  has_many :answers
  has_many :comments

  attr_reader :password
  before_validation :ensure_session_token



  # def gravatar_url
 #    "http://www.gravatar.com/avatar/#{ Digest::MD5.hexdigest(email) }"
 #  end

  def self.find_by_credentials(user_params)
    user = User.find_by_username(user_params[:username])
    user.try(:is_password?, user_params[:password]) ? user : nil
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_token!
    self.session_token = SecureRandom.urlsafe_base64(16)
    self.save!
    self.session_token
  end

  def self.new_guest
    # ActiveRecord::Base.connection_pool.with_connection do
      u = new { |u| u.guest = true
        u.username = "Guest #{Random.rand(99999)}"
        u.password = "password"
        u.email = "email@email.com" }

      u.save!(:validate => false)

      u
  end

  def move_to(user)
    questions.update_all(user_id: user.id)
    answers.update_all(user_id: user.id)
    comments.update_all(user_id: user.id)
    votes.update_all(user_id: user.id)
  end

  protected

  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64(16)
  end
end
