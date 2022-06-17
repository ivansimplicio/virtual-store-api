import User from 'App/Models/User'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import LoginUser from 'App/Validators/LoginUserValidator'
import BadRequest from 'App/Exceptions/Errors/BadRequest'

export default class AuthController {
  public async login({ auth, request, response }: HttpContextContract) {
    const { email, password } = await request.validate(LoginUser)
    try {
      const user = await User.findBy('email', email)
      const token = await auth.use('api').attempt(email, password, {
        expiresIn: '7days',
        name: user?.serialize().email,
      })
      await user?.load('roles')
      return { token, user: user?.serialize() }
    } catch {
      return response.status(400).send(new BadRequest('Invalid crendetials'))
    }
  }
}
