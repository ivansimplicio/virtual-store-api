import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import PasswordsService from 'App/Services/PasswordsService'
import ChangePassword from 'App/Validators/ChangePasswordValidator'
import ForgotPassword from 'App/Validators/ForgotPasswordValidator'
import ResetPassword from 'App/Validators/ResetPasswordValidator'

export default class PasswordsController {
  public async forgot({ request, response }: HttpContextContract) {
    const { email } = await request.validate(ForgotPassword)
    await PasswordsService.forgot(email, request.completeUrl(), request.url())
    return response.noContent()
  }

  public async reset({ request, response }: HttpContextContract) {
    const { newPassword } = await request.validate(ResetPassword)
    const token = request.input('token', '')
    await PasswordsService.reset(token, newPassword)
    return response.noContent()
  }

  public async change({ auth, request, response }: HttpContextContract) {
    const { currentPassword, newPassword } = await request.validate(ChangePassword)
    const { id } = await auth.use('api').authenticate()
    await PasswordsService.change(id, currentPassword, newPassword)
    return response.noContent()
  }
}
