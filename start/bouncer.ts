import Order from 'App/Models/Order'
import Roles from 'App/Enums/Roles'
import UsersService from 'App/Services/UsersService'
import User from 'App/Models/User'

import Bouncer from '@ioc:Adonis/Addons/Bouncer'

export const { actions } = Bouncer.define('isAdmin', async (loggedUser: User) => {
  return UsersService.userHasRole(loggedUser, Roles.ADMIN)
})
  .define('isClient', async (loggedUser: User) => {
    return UsersService.userHasRole(loggedUser, Roles.CLIENT)
  })
  .define('haveAccessToTheOrder', async (loggedUser: User, order: Order) => {
    const isAdmin = await UsersService.userHasRole(loggedUser, Roles.ADMIN)
    return isAdmin || loggedUser.id === order.userId
  })
  .define('haveAccessToTheUser', async (loggedUser: User, userId: number) => {
    const isAdmin = await UsersService.userHasRole(loggedUser, Roles.ADMIN)
    return isAdmin || loggedUser.id === userId
  })

export const { policies } = Bouncer.registerPolicies({})
