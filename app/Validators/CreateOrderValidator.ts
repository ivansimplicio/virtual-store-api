import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateOrderValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    addressId: schema.number([rules.unsigned()]),
    items: schema.array().members(
      schema.object().members({
        productId: schema.number([rules.exists({ table: 'products', column: 'id' })]),
        quantity: schema.number([rules.unsigned()]),
        discount: schema.number([rules.range(0, 0.99)]),
      })
    ),
  })

  public messages: CustomMessages = {}
}
