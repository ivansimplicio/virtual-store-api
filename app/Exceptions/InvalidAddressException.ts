import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Exception } from '@adonisjs/core/build/standalone'
import UnprocessableEntity from './Errors/UnprocessableEntity'

export default class InvalidAddressException extends Exception {
  constructor() {
    super('The address entered does not belong to the logged in user')
  }

  public async handle(error: this, ctx: HttpContextContract) {
    const unprocessableEntity = new UnprocessableEntity(error.message)
    ctx.response.status(unprocessableEntity.status).send(unprocessableEntity)
  }
}
