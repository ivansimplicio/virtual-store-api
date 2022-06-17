import '../App/Modules/Category/routes'
import '../App/Modules/Product/routes'
import '../App/Modules/User/routes'
import '../App/Modules/State/routes'
import '../App/Modules/Order/routes'

import Route from '@ioc:Adonis/Core/Route'

Route.post('login', 'AuthController.login')
