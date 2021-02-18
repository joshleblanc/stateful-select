class HomeController < ApplicationController
  def index
    @persons = Person.all unless @stimulus_reflex
  end
end
