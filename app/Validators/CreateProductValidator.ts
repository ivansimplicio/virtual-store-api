import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateProductValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({ trim: true }, [
      rules.minLength(1),
      rules.maxLength(100),
      rules.unique({ table: 'products', column: 'name' }),
    ]),
    price: schema.number([rules.range(0.01, Number.MAX_VALUE)]),
    categories: schema
      .array([rules.minLength(1), rules.distinct('*'), rules.existingCategories()])
      .members(schema.number()),
  })

  public messages: CustomMessages = {}
}
