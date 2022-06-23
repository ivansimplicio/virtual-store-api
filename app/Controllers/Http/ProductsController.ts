import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ProductsService from 'App/Services/ProductsService'
import CreateProduct from 'App/Validators/CreateProductValidator'
import UpdateProduct from 'App/Validators/UpdateProductValidator'

export default class ProductsController {
  public async index({ response }: HttpContextContract) {
    const products = await ProductsService.findAll()
    return response.ok({ products })
  }

  public async store({ request, response, bouncer }: HttpContextContract) {
    await bouncer.authorize('isAdmin')
    const payload = await request.validate(CreateProduct)
    const product = await ProductsService.insert(payload)
    return response.created({ product })
  }

  public async show({ request, response }: HttpContextContract) {
    const productId = request.param('id')
    const product = await ProductsService.find(productId)
    if (!product) {
      return response.notFound()
    }
    return response.ok({ product })
  }

  public async update({ request, response, bouncer }: HttpContextContract) {
    await bouncer.authorize('isAdmin')
    const productId = request.param('id')
    const payload = await request.validate(UpdateProduct)
    const product = await ProductsService.update(productId, payload)
    if (!product) {
      return response.notFound()
    }
    return response.ok({ product })
  }

  public async destroy({ request, response, bouncer }: HttpContextContract) {
    await bouncer.authorize('isAdmin')
    const productId = request.param('id')
    const result = await ProductsService.delete(productId)
    if (!result) {
      return response.notFound()
    }
    return response.noContent()
  }
}
