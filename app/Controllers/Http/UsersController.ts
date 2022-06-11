import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UsersService from 'App/Services/UsersService'
import CreateUser from 'App/Validators/CreateUserValidator'
import UpdateUser from 'App/Validators/UpdateUserValidator'

export default class UsersController {
  public async index({ response }: HttpContextContract) {
    const users = await UsersService.findAll()
    return response.ok({ users })
  }

  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate(CreateUser)
    const user = await UsersService.insert(payload)
    return response.created({ user })
  }

  public async show({ request, response }: HttpContextContract) {
    const userId = request.param('id')
    const user = await UsersService.find(userId)
    if (!user) {
      return response.notFound()
    }
    return response.ok({ user })
  }

  public async update({ request, response }: HttpContextContract) {
    const userId = request.param('id')
    const payload = await request.validate(UpdateUser)
    const user = await UsersService.update(userId, payload)
    if (!user) {
      return response.notFound()
    }
    return response.ok({ user })
  }

  public async destroy({ request, response }: HttpContextContract) {
    const userId = request.param('id')
    const result = await UsersService.delete(userId)
    if (!result) {
      return response.notFound()
    }
    return response.noContent()
  }
}
