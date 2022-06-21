import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({ trim: true }, [rules.minLength(2), rules.maxLength(100)]),
    email: schema.string({ trim: true }, [
      rules.email(),
      rules.maxLength(100),
      rules.unique({ table: 'users', column: 'email' }),
    ]),
    password: schema.string({ trim: true }, [rules.minLength(8), rules.maxLength(30)]),
    cpf: schema.string({ trim: true }, [
      rules.cpfIsValid(),
      rules.unique({ table: 'users', column: 'cpf' }),
    ]),
    phoneNumber: schema.string.optional({ trim: true }, [rules.maxLength(20)]),
    address: schema.object().members({
      street: schema.string({ trim: true }, [rules.minLength(5), rules.maxLength(100)]),
      number: schema.string.optional({ trim: true }, [rules.maxLength(10)]),
      district: schema.string.optional({ trim: true }, [rules.maxLength(30)]),
      zipCode: schema.string({ trim: true }, [rules.minLength(8), rules.maxLength(20)]),
      cityId: schema.number([rules.unsigned(), rules.exists({ table: 'cities', column: 'id' })]),
    }),
  })

  public messages: CustomMessages = {}
}
