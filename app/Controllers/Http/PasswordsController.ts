import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import PasswordsService from 'App/Services/PasswordsService'

export default class PasswordsController {
  public async forgot({ request, response }: HttpContextContract) {
    const { email } = request.only(['email'])
    await PasswordsService.forgot(email, request.completeUrl(), request.url())
    return response.noContent()
  }

  public async reset({ request, response }: HttpContextContract) {
    const { newPassword } = request.only(['newPassword'])
    const token = request.input('token', '')
    await PasswordsService.reset(token, newPassword)
    return response.noContent()
  }

  public async change({ auth, request, response }: HttpContextContract) {
    const { currentPassword, newPassword } = request.only(['currentPassword', 'newPassword'])
    const { id } = await auth.use('api').authenticate()
    await PasswordsService.change(id, currentPassword, newPassword)
    return response.noContent()
  }
}
