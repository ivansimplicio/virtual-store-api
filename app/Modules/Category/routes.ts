import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.resource('categories', 'CategoriesController')
    .apiOnly()
    .middleware({
      store: ['auth'],
      update: ['auth'],
      destroy: ['auth'],
    })
})
