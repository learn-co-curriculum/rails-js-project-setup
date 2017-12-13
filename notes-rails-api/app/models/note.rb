class Note < ApplicationRecord
  has_many :comments, dependent: :destroy
end
