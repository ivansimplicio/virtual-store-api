import BadRequest from 'App/Exceptions/Errors/BadRequest'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Exception } from '@adonisjs/core/build/standalone'

export default class InvalidTokenException extends Exception {
  constructor() {
    super('invalid token')
  }

  public async handle(error: this, ctx: HttpContextContract) {
    const badRequest = new BadRequest(error.message)
    ctx.response.status(badRequest.status).send(badRequest)
  }
}
