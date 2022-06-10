import StandardError from './StandardError'

export default class BadRequest extends StandardError {
  constructor(public message: string) {
    super(400, 'BAD_REQUEST', message)
  }
}
