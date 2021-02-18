require 'random_name_generator'

rng = RandomNameGenerator.new
100.times do 
    Person.create(name: rng.compose(3))
end