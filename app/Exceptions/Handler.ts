import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Logger from '@ioc:Adonis/Core/Logger'
import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler'
import BadRequest from './Errors/BadRequest'
import Unauthorized from './Errors/Unauthorized'

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
    if (error.code === 'E_AUTHORIZATION_FAILURE' || error.code === 'E_UNAUTHORIZED_ACCESS') {
      const unauthorized = new Unauthorized('not authorized to perform this action')
      return ctx.response.status(unauthorized.status).send(unauthorized)
    }
    return super.handle(error, ctx)
  }
}
