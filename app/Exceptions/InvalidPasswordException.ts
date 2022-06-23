import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BadRequest from 'App/Exceptions/Errors/BadRequest'
import { Exception } from '@adonisjs/core/build/standalone'

export default class InvalidPasswordException extends Exception {
  constructor() {
    super('current password incorrect')
  }

  public async handle(error: this, ctx: HttpContextContract) {
    const badRequest = new BadRequest(error.message)
    ctx.response.status(badRequest.status).send(badRequest)
  }
}
