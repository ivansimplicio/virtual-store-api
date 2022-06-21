import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Service from 'App/Services/CategoriesService'
import CreateCategory from 'App/Validators/CreateCategoryValidator'
import UpdateCategory from 'App/Validators/UpdateCategoryValidator'

export default class CategoriesController {
  public async index({ response }: HttpContextContract) {
    const categories = await Service.findAll()
    return response.ok({ categories })
  }

  public async store({ request, response, bouncer }: HttpContextContract) {
    await bouncer.authorize('isAdmin')
    const payload = await request.validate(CreateCategory)
    const category = await Service.insert(payload)
    return response.created({ category })
  }

  public async show({ request, response }: HttpContextContract) {
    const id = request.param('id')
    const category = await Service.find(id)
    if (!category) {
      return response.notFound()
    }
    return response.ok({ category })
  }

  public async update({ request, response, bouncer }: HttpContextContract) {
    await bouncer.authorize('isAdmin')
    const categoryId = request.param('id')
    const payload = await request.validate(UpdateCategory)
    const category = await Service.update(categoryId, payload)
    if (!category) {
      return response.notFound()
    }
    return response.ok({ category })
  }

  public async destroy({ request, response, bouncer }: HttpContextContract) {
    await bouncer.authorize('isAdmin')
    const categoryId = request.param('id')
    const result = await Service.delete(categoryId)
    if (!result) {
      return response.notFound()
    }
    return response.noContent()
  }
}
