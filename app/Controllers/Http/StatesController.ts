import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import State from 'App/Models/State'

export default class StatesController {
  public async index({ response }: HttpContextContract) {
    const states = await State.all()
    return response.ok({ states })
  }

  public async show({ request, response }: HttpContextContract) {
    const stateId = request.param('id')
    const state = await State.find(stateId)
    if (!state) {
      return response.notFound()
    }
    await state.load('cities')
    return response.ok({ state })
  }
}
