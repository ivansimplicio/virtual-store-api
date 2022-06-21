import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.resource('addresses', 'AddressesController').apiOnly()
})
  .prefix('clients')
  .middleware('auth')
