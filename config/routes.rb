Rails.application.routes.draw do
  root to: 'ajax#session'
  get 'ajax/home'
  get 'ajax/session'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
