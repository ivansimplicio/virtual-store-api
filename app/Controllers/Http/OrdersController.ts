import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import OrdersService from 'App/Services/OrdersService'
import CreateOrder from 'App/Validators/CreateOrderValidator'

export default class OrdersController {
  public async index({ response }: HttpContextContract) {
    const orders = await OrdersService.findAll()
    return response.ok({ orders })
  }

  public async show({ request, response }: HttpContextContract) {
    const orderId = request.param('id')
    const order = await OrdersService.find(orderId)
    if (!order) {
      return response.notFound()
    }
    return response.ok({ order })
  }

  public async store({ request, response }: HttpContextContract) {
    const USER_ID = 2
    const payload = await request.validate(CreateOrder)
    const order = await OrdersService.store(USER_ID, payload)
    return response.ok({ order })
  }
}
