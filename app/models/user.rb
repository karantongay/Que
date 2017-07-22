#Model for handling user related operations
class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_one :profile, dependent: :destroy
  accepts_nested_attributes_for :profile

  has_many :relationships, :foreign_key => "follower_id",
                       :dependent => :destroy

  acts_as_follower
  acts_as_followable

  def self.follower_hash current_user
    User.select('email', 'id').collect do |user|
    if current_user.id != user.id
      user_hash = { id: user.id, email: user.email }
      user_hash[:follow] = current_user.following?(user) ? "Unfollow" : "Follow"
      user_hash
    end

    end
  end
end