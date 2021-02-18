json.array! @persons do |person|
    json.label person.name
    json.value person.id
end