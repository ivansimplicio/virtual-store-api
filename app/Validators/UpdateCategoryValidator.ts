import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateCategoryValidator {
  constructor(protected ctx: HttpContextContract) {}

  public refs = schema.refs({
    categoryId: this.ctx.params.id,
  })

  public schema = schema.create({
    name: schema.string.optional({ trim: true }, [
      rules.minLength(1),
      rules.maxLength(30),
      rules.unique({ table: 'categories', column: 'name', whereNot: { id: this.refs.categoryId } }),
    ]),
    description: schema.string.optional({ trim: true }, [rules.maxLength(150)]),
  })

  public messages: CustomMessages = {}
}
