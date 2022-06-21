import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateAddressValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    street: schema.string({ trim: true }, [rules.minLength(5), rules.maxLength(100)]),
    number: schema.string.optional({ trim: true }, [rules.maxLength(10)]),
    district: schema.string.optional({ trim: true }, [rules.maxLength(30)]),
    zipCode: schema.string({ trim: true }, [rules.minLength(8), rules.maxLength(20)]),
    cityId: schema.number([rules.unsigned(), rules.exists({ table: 'cities', column: 'id' })]),
  })

  public messages: CustomMessages = {}
}
