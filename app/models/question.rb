#Model for handling question related operations and validations
class Question < ApplicationRecord
  has_many :answers, dependent: :destroy
  validates :title, :contents, presence: true,
                  length: { minimum: 5 }
  #validates :askedby, presence: true

  def self.search(search)
   where("title LIKE ?", "%#{search}%")
   #where("contents LIKE ?", "%#{search}%")
  end
end