import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'StatesController.index')
  Route.get('/:id', 'StatesController.show')
}).prefix('states')
