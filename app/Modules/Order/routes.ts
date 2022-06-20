import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.resource('orders', 'OrdersController').only(['index', 'store', 'show'])
}).middleware('auth')
