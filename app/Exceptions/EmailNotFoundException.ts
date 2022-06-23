import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Exception } from '@adonisjs/core/build/standalone'
import NotFound from './Errors/NotFound'

export default class EmailNotFoundException extends Exception {
  constructor(public message: string) {
    super(message)
  }

  public async handle(error: this, ctx: HttpContextContract) {
    const notFound = new NotFound(error.message)
    ctx.response.status(notFound.status).send(notFound)
  }
}
