import '../app/Modules/Category/routes'
import '../app/Modules/Product/routes'
import '../app/Modules/User/routes'
import '../app/Modules/Admin/routes'
import '../app/Modules/State/routes'
import '../app/Modules/Order/routes'
import '../app/Modules/Address/routes'
import '../app/Modules/Password/routes'

import Route from '@ioc:Adonis/Core/Route'

Route.post('login', 'AuthController.login')
