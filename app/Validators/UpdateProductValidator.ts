import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateProductValidator {
  constructor(protected ctx: HttpContextContract) {}

  public refs = schema.refs({
    productId: this.ctx.params.id,
  })

  public schema = schema.create({
    name: schema.string.optional({ trim: true }, [
      rules.minLength(1),
      rules.maxLength(100),
      rules.unique({ table: 'products', column: 'name', whereNot: { id: this.refs.productId } }),
    ]),
    price: schema.number.optional([rules.range(0.01, Number.MAX_VALUE)]),
    categories: schema.array
      .optional([rules.minLength(1), rules.distinct('*'), rules.existingCategories()])
      .members(schema.number()),
  })

  public messages: CustomMessages = {}
}
