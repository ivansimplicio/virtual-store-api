import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Exception } from '@adonisjs/core/build/standalone'
import Gone from './Errors/Gone'

export default class ExpiredTokenException extends Exception {
  constructor() {
    super('token has expired')
  }

  public async handle(error: this, ctx: HttpContextContract) {
    const gone = new Gone(error.message)
    ctx.response.status(gone.status).send(gone)
  }
}
