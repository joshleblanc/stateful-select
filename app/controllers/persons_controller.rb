class PersonsController < ApplicationController
  def filter
    @persons = Person.where(Person.arel_table[:name].matches("%#{params[:q]}%"))
  end
end
