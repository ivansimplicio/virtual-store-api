import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AdminsService from 'App/Services/AdminsService'
import CreateAdmin from 'App/Validators/CreateAdminValidator'

export default class AdminsController {
  public async store({ request, response, bouncer }: HttpContextContract) {
    await bouncer.authorize('isAdmin')
    const payload = await request.validate(CreateAdmin)
    const admin = await AdminsService.insert(payload)
    return response.created({ admin })
  }
}
