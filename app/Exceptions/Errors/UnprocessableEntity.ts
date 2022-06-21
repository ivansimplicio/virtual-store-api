import StandardError from './StandardError'

export default class UnprocessableEntity extends StandardError {
  constructor(public message: string) {
    super(422, 'UNPROCESSABLE_ENTITY', message)
  }
}
