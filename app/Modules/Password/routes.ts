import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('forgot-password', 'PasswordsController.forgot')
  Route.put('reset-password', 'PasswordsController.reset')
  Route.put('change-password', 'PasswordsController.change').middleware('auth')
})
