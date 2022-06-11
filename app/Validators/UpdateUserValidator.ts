import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public refs = schema.refs({
    userId: this.ctx.params.id,
  })

  public schema = schema.create({
    name: schema.string.optional({ trim: true }, [rules.minLength(2), rules.maxLength(100)]),
    email: schema.string.optional({ trim: true }, [
      rules.email(),
      rules.maxLength(100),
      rules.unique({ table: 'users', column: 'email', whereNot: { id: this.refs.userId } }),
    ]),
    password: schema.string.optional({ trim: true }, [rules.minLength(8), rules.maxLength(30)]),
    cpf: schema.string.optional({ trim: true }, [
      rules.cpfIsValid(),
      rules.unique({ table: 'users', column: 'cpf', whereNot: { id: this.refs.userId } }),
    ]),
    phoneNumber: schema.string.optional({ trim: true }, [rules.maxLength(20)]),
  })

  public messages: CustomMessages = {}
}
