import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateCategoryValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({ trim: true }, [
      rules.minLength(1),
      rules.maxLength(30),
      rules.unique({ table: 'categories', column: 'name' }),
    ]),
    description: schema.string({ trim: true }, [rules.maxLength(150)]),
  })

  public messages: CustomMessages = {}
}
