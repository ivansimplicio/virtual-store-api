import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Exception } from '@adonisjs/core/build/standalone'
import UnprocessableEntity from './Errors/UnprocessableEntity'

export default class NumberOfAddressesException extends Exception {
  constructor(public message: string) {
    super(message)
  }

  public async handle(error: this, ctx: HttpContextContract) {
    const unprocessableEntity = new UnprocessableEntity(error.message)
    ctx.response.status(unprocessableEntity.status).send(unprocessableEntity)
  }
}
