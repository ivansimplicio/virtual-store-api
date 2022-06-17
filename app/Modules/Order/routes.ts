import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'OrdersController.index')
  Route.post('/', 'OrdersController.store')
  Route.get('/:id', 'OrdersController.show')
})
  .prefix('orders')
  .middleware('auth')
