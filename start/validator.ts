import Category from 'App/Models/Category'
import { validator } from '@ioc:Adonis/Core/Validator'

const validation = async (value: number[], _: any, options: any) => {
  const nonExistentIds: number[] = []
  for (let id of value) {
    const item = await Category.find(id)
    if (!item) {
      nonExistentIds.push(id)
    }
  }
  if (nonExistentIds.length > 0) {
    options.errorReporter.report(
      options.pointer,
      'existingCategories',
      `the following ids reported for categories are non-existent: ${nonExistentIds.join(', ')}`,
      options.arrayExpressionPointer
    )
  }
}

validator.rule('existingCategories', validation, () => {
  return {
    async: true,
    compiledOptions: {},
  }
})
