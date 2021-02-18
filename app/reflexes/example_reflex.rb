# frozen_string_literal: true

class ExampleReflex < ApplicationReflex
  delegate :uuid, to: :connection

  def test
    puts "We're live!"
  end

  def filter
    values = JSON.parse(element.dataset["select-selected"]).map { |a| a["value"] }
    @persons = Person.where(id: values)
  end
end
