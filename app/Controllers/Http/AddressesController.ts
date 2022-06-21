import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AddressesService from 'App/Services/AddressesService'

export default class AddressesController {
  public async index({ auth, response, bouncer }: HttpContextContract) {
    await bouncer.authorize('isClient')
    const { id } = await auth.use('api').authenticate()
    const addresses = await AddressesService.findAll(id)
    return response.ok({ addresses })
  }

  public async store({ auth, request, response, bouncer }: HttpContextContract) {
    await bouncer.authorize('isClient')
    const { id } = await auth.use('api').authenticate()
    const payload = request.only(['street', 'number', 'district', 'zipCode', 'cityId'])
    const address = await AddressesService.insert(id, payload)
    return response.created(address)
  }

  public async show({ auth, request, response, bouncer }: HttpContextContract) {
    await bouncer.authorize('isClient')
    const { id } = await auth.use('api').authenticate()
    const addressId = Number(request.param('id'))
    const address = await AddressesService.find(id, addressId)
    if (!address) {
      return response.notFound()
    }
    return response.ok({ address })
  }

  public async update({ auth, request, response, bouncer }: HttpContextContract) {
    await bouncer.authorize('isClient')
    const { id } = await auth.use('api').authenticate()
    const addressId = Number(request.param('id'))
    const payload = request.only(['street', 'number', 'district', 'zipCode', 'cityId'])
    const address = await AddressesService.update(id, addressId, payload)
    if (!address) {
      return response.notFound()
    }
    return response.ok({ address })
  }

  public async destroy({ auth, request, response, bouncer }: HttpContextContract) {
    await bouncer.authorize('isClient')
    const { id } = await auth.use('api').authenticate()
    const addressId = Number(request.param('id'))
    const result = await AddressesService.delete(id, addressId)
    if (!result) {
      return response.notFound()
    }
    return response.noContent()
  }
}
