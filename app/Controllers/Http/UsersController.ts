import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UsersService from 'App/Services/UsersService'
import CreateUser from 'App/Validators/CreateUserValidator'
import UpdateUser from 'App/Validators/UpdateUserValidator'

export default class UsersController {
  public async index({ request, response, bouncer }: HttpContextContract) {
    await bouncer.authorize('isAdmin')
    const { page = 1, limit = 10, name = '' } = request.qs()
    const users = await UsersService.findAll(page, limit, name)
    return response.ok({ users })
  }

  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate(CreateUser)
    const user = await UsersService.insert(payload)
    return response.created({ user })
  }

  public async show({ request, response, bouncer }: HttpContextContract) {
    const userId = Number(request.param('id'))
    await bouncer.authorize('haveAccessToTheUser', userId)
    const user = await UsersService.find(userId)
    if (!user) {
      return response.notFound()
    }
    return response.ok({ user })
  }

  public async update({ request, response, bouncer }: HttpContextContract) {
    const userId = Number(request.param('id'))
    await bouncer.authorize('haveAccessToTheUser', userId)
    const payload = await request.validate(UpdateUser)
    const user = await UsersService.update(userId, payload)
    if (!user) {
      return response.notFound()
    }
    return response.ok({ user })
  }

  public async destroy({ request, response, bouncer }: HttpContextContract) {
    const userId = Number(request.param('id'))
    await bouncer.authorize('haveAccessToTheUser', userId)
    const result = await UsersService.delete(userId)
    if (!result) {
      return response.notFound()
    }
    return response.noContent()
  }
}
