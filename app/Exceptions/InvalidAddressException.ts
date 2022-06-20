import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Exception } from '@adonisjs/core/build/standalone'
import BadRequest from './Errors/BadRequest'

export default class InvalidAddressException extends Exception {
  constructor() {
    super('The address entered does not belong to the logged in user')
  }

  public async handle(error: this, ctx: HttpContextContract) {
    const badRequest = new BadRequest(error.message)
    ctx.response.status(badRequest.status).send(badRequest)
  }
}
