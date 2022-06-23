import StandardError from './StandardError'

export default class NotFound extends StandardError {
  constructor(public message: string) {
    super(404, 'NOT_FOUND', message)
  }
}
