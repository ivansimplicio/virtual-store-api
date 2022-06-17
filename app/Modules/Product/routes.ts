import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.resource('products', 'ProductsController')
    .apiOnly()
    .middleware({
      store: ['auth'],
      update: ['auth'],
      destroy: ['auth'],
    })
})
