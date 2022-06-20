import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import OrdersService from 'App/Services/OrdersService'
import CreateOrder from 'App/Validators/CreateOrderValidator'

export default class OrdersController {
  public async index({ response, bouncer }: HttpContextContract) {
    await bouncer.authorize('isAdmin')
    const orders = await OrdersService.findAll()
    return response.ok({ orders })
  }

  public async show({ request, response, bouncer }: HttpContextContract) {
    const orderId = request.param('id')
    const order = await OrdersService.find(orderId)
    if (!order) {
      return response.notFound()
    }
    await bouncer.authorize('haveAccessToTheOrder', order)
    return response.ok({ order })
  }

  public async store({ request, response, bouncer }: HttpContextContract) {
    await bouncer.authorize('isClient')
    const USER_ID = 2
    const payload = await request.validate(CreateOrder)
    const order = await OrdersService.store(USER_ID, payload)
    return response.ok({ order })
  }
}
