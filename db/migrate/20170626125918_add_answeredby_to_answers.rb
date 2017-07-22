class AddAnsweredbyToAnswers < ActiveRecord::Migration[5.1]
  def change
    add_column :answers, :answeredby, :string
  end
end
