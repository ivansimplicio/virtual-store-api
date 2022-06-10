import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Logger from '@ioc:Adonis/Core/Logger'
import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler'
import BadRequest from './Errors/BadRequest'

export default class ExceptionHandler extends HttpExceptionHandler {
  constructor() {
    super(Logger)
  }

  public async handle(error: any, ctx: HttpContextContract) {
    if (error.code === 'ER_ROW_IS_REFERENCED_2') {
      const badRequest = new BadRequest(
        'could not delete record as there is some other record associated with this record'
      )
      return ctx.response.status(badRequest.status).send(badRequest)
    }
    return super.handle(error, ctx)
  }
}
