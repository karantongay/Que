class Answer < ApplicationRecord
  belongs_to :question
  validates :contents, presence: true,
  length: { minimum: 5 }
end