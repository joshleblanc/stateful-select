Rails.application.routes.draw do
  get 'persons/filter'
  root to: "home#index"
  get "persons/filter" => "persons#filter"
end
