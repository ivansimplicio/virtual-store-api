import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Service from 'App/Services/ProductsService'
import CreateProduct from 'App/Validators/CreateProductValidator'
import UpdateProduct from 'App/Validators/UpdateProductValidator'

export default class ProductsController {
  public async index({ response }: HttpContextContract) {
    const products = await Service.findAll()
    return response.ok({ products })
  }

  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate(CreateProduct)
    const product = await Service.insert(payload)
    return response.created({ product })
  }

  public async show({ request, response }: HttpContextContract) {
    const productId = request.param('id')
    const product = await Service.find(productId)
    if (!product) {
      return response.notFound()
    }
    return response.ok({ product })
  }

  public async update({ request, response }: HttpContextContract) {
    const productId = request.param('id')
    const payload = await request.validate(UpdateProduct)
    const product = await Service.update(productId, payload)
    if (!product) {
      return response.notFound()
    }
    return response.ok({ product })
  }

  public async destroy({ request, response }: HttpContextContract) {
    const productId = request.param('id')
    const result = await Service.delete(productId)
    if (!result) {
      return response.notFound()
    }
    return response.noContent()
  }
}
