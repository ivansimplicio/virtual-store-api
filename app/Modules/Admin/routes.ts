import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/', 'AdminsController.store')
})
  .prefix('admins')
  .middleware('auth')
