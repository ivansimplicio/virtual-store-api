import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ResetPasswordValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    newPassword: schema.string({ trim: true }, [
      rules.minLength(8),
      rules.maxLength(30),
      rules.confirmed('passwordConfirmation'),
    ]),
  })

  public messages: CustomMessages = {
    'passwordConfirmation.confirmed': 'Password do not match',
  }
}
