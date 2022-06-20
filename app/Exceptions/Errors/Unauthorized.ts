import StandardError from './StandardError'

export default class Unauthorized extends StandardError {
  constructor(public message: string) {
    super(401, 'UNAUTHORIZED', message)
  }
}
