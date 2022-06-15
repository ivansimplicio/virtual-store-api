import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Exception } from '@adonisjs/core/build/standalone'
import BadRequest from './Errors/BadRequest'

export default class InvalidAddressException extends Exception {
  public status = 400

  constructor() {
    super('The address entered does not belong to the logged in user')
  }

  public async handle(error: this, ctx: HttpContextContract) {
    ctx.response.status(error.status).send(new BadRequest(error.message))
  }
}
